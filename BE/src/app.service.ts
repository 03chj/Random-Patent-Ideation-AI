import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { lastValueFrom } from "rxjs";
import { parseStringPromise } from "xml2js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  private readonly apiKey = process.env.KIPRIS_API_KEY;

  async getPatents(problemDescription: string) {
    const { field, issue } = await this.splitString(problemDescription);

    console.log(
      "openai = " +
        issue +
        "\n 위 문장에서 명사형 키워드를 추출해 리스트형식으로 반환. 리스트 이외에 다른 답변은 하지 않음."
    );
    const issue_keyword_list = await this.openai(
      issue +
        '\n 위 문장에서 명사형 키워드를 추출해 리스트형식으로 반환. 리스트 이외에 다른 답변은 하지 않음. \n 예시출력: ["피자", "김치"]'
    );
    console.log("issue_keyword_list = " + issue_keyword_list);

    const filtered_issue_keyword_list = await this.openai(
      issue_keyword_list +
        "\n 위 키워드리스트에서 아래 이슈에 대해 포함해야할 키워드만 리스트로 반환. 리스트 이외에 다른 답변은 하지 않음. \n 예시: 이슈-강성은 유지하면서 경량화 시키고 싶어. 방법이 없을까??, 키워드리스트: [강성, 경량화, 방법], 포함-[경량화, 강성], 무시 - [방법] \n 예시출력: 경량화, 강성 \n" +
        issue
    );
    console.log("filtered_issue_keyword_list = " + filtered_issue_keyword_list);

    const issue_keyword = filtered_issue_keyword_list
      .map((keyword) => keyword.trim())
      .join("AND");
    console.log("issue_keyword = " + issue_keyword);

    const query = issue_keyword + "AND" + "!" + field;
    const sanitizedQuery = query.replace(/\s+/g, "");
    console.log("query = " + sanitizedQuery);

    const patents = await this.keywordSearch(sanitizedQuery);

    const result = await this.selectPatents(patents, issue);

    return result;
  }

  async splitString(input: string): Promise<{ field: string; issue: string }> {
    const [field, issue] = await input.split("/");
    return { field, issue };
  }

  async keywordSearch(keyword: string) {
    const baseUrl =
      "http://plus.kipris.or.kr/kipo-api/kipi/patUtiModInfoSearchSevice/getWordSearch";
    const url1 = "?word=" + keyword;
    const url2 = "&numOfRows=20";
    const url3 = "&ServiceKey=" + this.apiKey;

    const url = baseUrl + url1 + url2 + url3;

    const response = await lastValueFrom(this.httpService.get(url));
    const content = response.data;

    const dictType = await parseStringPromise(content);

    const body = dictType.response.body[0];

    const result = {
      solutions: [],
    };
    console.log(result);

    const itemCount = body.items[0].item.length;
    console.log(itemCount);

    for (let i = 0; i < Math.min(20, itemCount); i++) {
      const item = body.items[0].item[i];
      result.solutions.push({
        inventionTitle: item.inventionTitle[0],
        applicationDate: item.applicationDate[0],
        applicantName: item.applicantName[0],
        explanation: item.astrtCont[0], //일단 초록.
        url: await this.getFullTextPDF(item.applicationNumber[0]), //출원번호로 url 가져오기
      });
    }

    return result;
  }

  async openai(prompt: string): Promise<string[]> {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    let result = "";
    for await (const chunk of stream) {
      result += chunk.choices[0]?.delta?.content || "";
    }

    return result
      .split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0);
  }
  //특허의 초록과 문제 상황 설명이 GPT에게 들어가면 가능한지 판단: true/false
  async isProper(astrtCont: string, issue: string) {
    const ask = `\"${astrtCont}\"라는 내용의 특허 기술이 ${issue}라는 문제의 해결방안이 될 수 있을까? YES 또는 NO로 답변해줘. \n ###출력예시1### YES ###출력예시2### NO `;

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: ask }],
      stream: true,
    });

    let response = "";
    for await (const chunk of stream) {
      const answer = chunk.choices[0]?.delta.content || "";
      response += answer;
    }

    console.log(response);
    if (response.trim() === "YES") return true;
    else if (response.trim() == "NO") return false;
    else {
      throw new Error(`Unexpected response: ${response}`);
    }
  }

  //출원번호 받아서 공개전문PDF URL 반환
  async getFullTextPDF(applicationNumber: string) {
    const baseUrl =
      "http://plus.kipris.or.kr/kipo-api/kipi/patUtiModInfoSearchSevice/getPubFullTextInfoSearch";
    const url1 = "?applicationNumber=" + applicationNumber;
    const url2 = "&ServiceKey=" + this.apiKey;
    const url = baseUrl + url1 + url2;

    const response = await lastValueFrom(this.httpService.get(url));
    const content = response.data;
    const dictType = await parseStringPromise(content);
    const body = dictType.response.body[0];

    const pdf_URL = String(body.item[0].path);

    return pdf_URL;
  }

  async selectPatents(patents, issue: string) {
    const solutionCount = patents.solutions.length;
    console.log(`Number of solutions: ${solutionCount}`);

    const finalResult = {
      solutions: [],
    };

    for (let i = 0; i < Math.min(20, solutionCount); i++) {
      if (await this.isProper(patents.solutions[i].explanation, issue)) {
        finalResult.solutions.push(patents.solutions[i]);
      }
    }

    console.log(finalResult.solutions.length);
    return finalResult;
  }
}
