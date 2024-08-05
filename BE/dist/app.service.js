"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const rxjs_1 = require("rxjs");
const xml2js_1 = require("xml2js");
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
let AppService = class AppService {
    constructor(httpService) {
        this.httpService = httpService;
        this.apiKey = process.env.KIPRIS_API_KEY;
    }
    async getPatents(problemDescription) {
        const { field, issue } = await this.splitString(problemDescription);
        console.log("openai = " +
            issue +
            "\n 위 문장에서 명사형 키워드를 추출해 리스트형식으로 반환. 리스트 이외에 다른 답변은 하지 않음.");
        const issue_keyword_list = await this.openai(issue +
            '\n 위 문장에서 명사형 키워드를 추출해 리스트형식으로 반환. 리스트 이외에 다른 답변은 하지 않음. \n 예시출력: ["피자", "김치"]');
        console.log("issue_keyword_list = " + issue_keyword_list);
        const filtered_issue_keyword_list = await this.openai(issue_keyword_list +
            "\n 위 키워드리스트에서 아래 이슈에 대해 포함해야할 키워드만 리스트로 반환. 리스트 이외에 다른 답변은 하지 않음. \n 예시: 이슈-강성은 유지하면서 경량화 시키고 싶어. 방법이 없을까??, 키워드리스트: [강성, 경량화, 방법], 포함-[경량화, 강성], 무시 - [방법] \n 예시출력: 경량화, 강성 \n" +
            issue);
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
    async splitString(input) {
        const [field, issue] = await input.split("/");
        return { field, issue };
    }
    async keywordSearch(keyword) {
        const baseUrl = "http://plus.kipris.or.kr/kipo-api/kipi/patUtiModInfoSearchSevice/getWordSearch";
        const url1 = "?word=" + keyword;
        const url2 = "&numOfRows=50";
        const url3 = "&ServiceKey=" + this.apiKey;
        const url = baseUrl + url1 + url2 + url3;
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
        const content = response.data;
        const dictType = await (0, xml2js_1.parseStringPromise)(content);
        const body = dictType.response.body[0];
        const result = {
            solutions: [],
        };
        console.log(result);
        const itemCount = body.items[0].item.length;
        console.log(itemCount);
        for (let i = 0; i < Math.min(50, itemCount); i++) {
            const item = body.items[0].item[i];
            result.solutions.push({
                inventionTitle: item.inventionTitle[0],
                applicationDate: item.applicationDate[0],
                applicantName: item.applicantName[0],
                explanation: item.astrtCont[0],
                url: await this.getFullTextPDF(item.applicationNumber[0]),
            });
        }
        return result;
    }
    async openai(prompt) {
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
    async isProper(astrtCont, issue) {
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
        if (response.trim() === "YES")
            return true;
        else if (response.trim() == "NO")
            return false;
        else {
            throw new Error(`Unexpected response: ${response}`);
        }
    }
    async getFullTextPDF(applicationNumber) {
        const baseUrl = "http://plus.kipris.or.kr/kipo-api/kipi/patUtiModInfoSearchSevice/getPubFullTextInfoSearch";
        const url1 = "?applicationNumber=" + applicationNumber;
        const url2 = "&ServiceKey=" + this.apiKey;
        const url = baseUrl + url1 + url2;
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
        const content = response.data;
        const dictType = await (0, xml2js_1.parseStringPromise)(content);
        const body = dictType.response.body[0];
        const pdf_URL = String(body.item[0].path);
        return pdf_URL;
    }
    async selectPatents(patents, issue) {
        const solutionCount = patents.solutions.length;
        console.log(`Number of solutions: ${solutionCount}`);
        const finalResult = {
            solutions: [],
        };
        for (let i = 0; i < Math.min(50, solutionCount); i++) {
            if (await this.isProper(patents.solutions[i].explanation, issue)) {
                finalResult.solutions.push(patents.solutions[i]);
            }
        }
        console.log(finalResult.solutions.length);
        return finalResult;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppService);
//# sourceMappingURL=app.service.js.map