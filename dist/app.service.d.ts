import { HttpService } from '@nestjs/axios';
export declare class AppService {
    private readonly httpService;
    constructor(httpService: HttpService);
    private readonly apiKey;
    getPatents(problemDescription: string): Promise<{
        solutions: any[];
    }>;
    splitString(input: string): Promise<{
        field: string;
        issue: string;
    }>;
    keywordSearch(keyword: string): Promise<{
        solutions: any[];
    }>;
    openai(prompt: string): Promise<string[]>;
    isProper(astrtCont: string, issue: string): Promise<boolean>;
    getFullTextPDF(applicationNumber: string): Promise<string>;
    selectPatents(patents: any, issue: string): Promise<{
        solutions: any[];
    }>;
}
