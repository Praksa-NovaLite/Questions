//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.0.3.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IAnswersClient {
    addAnswer(answerDto: AnswerDto): Observable<AnswerDto>;
}

@Injectable({
    providedIn: 'root'
})
export class AnswersClient implements IAnswersClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ?? "https://localhost:5019";
    }

    addAnswer(answerDto: AnswerDto): Observable<AnswerDto> {
        let url_ = this.baseUrl + "/api/Answers/add-answer";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(answerDto);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processAddAnswer(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAddAnswer(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<AnswerDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<AnswerDto>;
        }));
    }

    protected processAddAnswer(response: HttpResponseBase): Observable<AnswerDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = AnswerDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

export interface IExamsClient {
    addExam(addExam: AddExam): Observable<FileResponse>;
    get(id: number | undefined): Observable<ExamDto>;
}

@Injectable({
    providedIn: 'root'
})
export class ExamsClient implements IExamsClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ?? "https://localhost:5019";
    }

    addExam(addExam: AddExam): Observable<FileResponse> {
        let url_ = this.baseUrl + "/api/Exams/add";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(addExam);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processAddExam(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAddExam(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<FileResponse>;
                }
            } else
                return _observableThrow(response_) as any as Observable<FileResponse>;
        }));
    }

    protected processAddExam(response: HttpResponseBase): Observable<FileResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return _observableOf({ fileName: fileName, data: responseBlob as any, status: status, headers: _headers });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    get(id: number | undefined): Observable<ExamDto> {
        let url_ = this.baseUrl + "/api/Exams?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<ExamDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<ExamDto>;
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<ExamDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = ExamDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

export interface IQuestionsClient {
    create(question: QuestionDto): Observable<QuestionDto>;
    getById(id: number): Observable<QuestionDto>;
    update(id: number, question: QuestionDto): Observable<QuestionDto>;
    getAll(): Observable<QuestionDto[]>;
}

@Injectable({
    providedIn: 'root'
})
export class QuestionsClient implements IQuestionsClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ?? "https://localhost:5019";
    }

    create(question: QuestionDto): Observable<QuestionDto> {
        let url_ = this.baseUrl + "/api/Questions/create";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(question);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<QuestionDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<QuestionDto>;
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<QuestionDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = QuestionDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    getById(id: number): Observable<QuestionDto> {
        let url_ = this.baseUrl + "/api/Questions/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetById(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetById(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<QuestionDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<QuestionDto>;
        }));
    }

    protected processGetById(response: HttpResponseBase): Observable<QuestionDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = QuestionDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    update(id: number, question: QuestionDto): Observable<QuestionDto> {
        let url_ = this.baseUrl + "/api/Questions/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(question);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpdate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdate(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<QuestionDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<QuestionDto>;
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<QuestionDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = QuestionDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    getAll(): Observable<QuestionDto[]> {
        let url_ = this.baseUrl + "/api/Questions";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json",
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<QuestionDto[]>;
                }
            } else
                return _observableThrow(response_) as any as Observable<QuestionDto[]>;
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<QuestionDto[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(QuestionDto.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

export class AnswerDto implements IAnswerDto {
    answerName?: string;
    isCorrect?: boolean;

    constructor(data?: IAnswerDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.answerName = _data["answerName"];
            this.isCorrect = _data["isCorrect"];
        }
    }

    static fromJS(data: any): AnswerDto {
        data = typeof data === 'object' ? data : {};
        let result = new AnswerDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["answerName"] = this.answerName;
        data["isCorrect"] = this.isCorrect;
        return data;
    }
}

export interface IAnswerDto {
    answerName?: string;
    isCorrect?: boolean;
}

export class AddExam implements IAddExam {
    categoryTypes?: CategoryType[];
    examDto?: ExamDto;

    constructor(data?: IAddExam) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["categoryTypes"])) {
                this.categoryTypes = [] as any;
                for (let item of _data["categoryTypes"])
                    this.categoryTypes!.push(item);
            }
            this.examDto = _data["examDto"] ? ExamDto.fromJS(_data["examDto"]) : <any>undefined;
        }
    }

    static fromJS(data: any): AddExam {
        data = typeof data === 'object' ? data : {};
        let result = new AddExam();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.categoryTypes)) {
            data["categoryTypes"] = [];
            for (let item of this.categoryTypes)
                data["categoryTypes"].push(item);
        }
        data["examDto"] = this.examDto ? this.examDto.toJSON() : <any>undefined;
        return data;
    }
}

export interface IAddExam {
    categoryTypes?: CategoryType[];
    examDto?: ExamDto;
}

export enum CategoryType {
    DOTNET = 0,
    GIT = 1,
    SQL = 2,
    HTTPS = 3,
    JAVA = 4,
    SCALA = 5,
}

export class ExamDto implements IExamDto {
    candidateId?: number;
    questions?: Question[];
    maxScore?: number;

    constructor(data?: IExamDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.candidateId = _data["candidateId"];
            if (Array.isArray(_data["questions"])) {
                this.questions = [] as any;
                for (let item of _data["questions"])
                    this.questions!.push(Question.fromJS(item));
            }
            this.maxScore = _data["maxScore"];
        }
    }

    static fromJS(data: any): ExamDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExamDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["candidateId"] = this.candidateId;
        if (Array.isArray(this.questions)) {
            data["questions"] = [];
            for (let item of this.questions)
                data["questions"].push(item.toJSON());
        }
        data["maxScore"] = this.maxScore;
        return data;
    }
}

export interface IExamDto {
    candidateId?: number;
    questions?: Question[];
    maxScore?: number;
}

export abstract class Entity implements IEntity {
    id?: number;

    constructor(data?: IEntity) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
        }
    }

    static fromJS(data: any): Entity {
        data = typeof data === 'object' ? data : {};
        throw new Error("The abstract class 'Entity' cannot be instantiated.");
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        return data;
    }
}

export interface IEntity {
    id?: number;
}

export class Question extends Entity implements IQuestion {
    title?: string;
    category?: CategoryType;
    type?: AnswerType;
    score?: number;
    answers?: Answer[];

    constructor(data?: IQuestion) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.title = _data["title"];
            this.category = _data["category"];
            this.type = _data["type"];
            this.score = _data["score"];
            if (Array.isArray(_data["answers"])) {
                this.answers = [] as any;
                for (let item of _data["answers"])
                    this.answers!.push(Answer.fromJS(item));
            }
        }
    }

    static override fromJS(data: any): Question {
        data = typeof data === 'object' ? data : {};
        let result = new Question();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["title"] = this.title;
        data["category"] = this.category;
        data["type"] = this.type;
        data["score"] = this.score;
        if (Array.isArray(this.answers)) {
            data["answers"] = [];
            for (let item of this.answers)
                data["answers"].push(item.toJSON());
        }
        super.toJSON(data);
        return data;
    }
}

export interface IQuestion extends IEntity {
    title?: string;
    category?: CategoryType;
    type?: AnswerType;
    score?: number;
    answers?: Answer[];
}

export enum AnswerType {
    RadioButton = 0,
    Checkbox = 1,
}

export class Answer extends Entity implements IAnswer {
    questionId?: number;
    answerName?: string;
    isCorrect?: boolean;

    constructor(data?: IAnswer) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.questionId = _data["questionId"];
            this.answerName = _data["answerName"];
            this.isCorrect = _data["isCorrect"];
        }
    }

    static override fromJS(data: any): Answer {
        data = typeof data === 'object' ? data : {};
        let result = new Answer();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["questionId"] = this.questionId;
        data["answerName"] = this.answerName;
        data["isCorrect"] = this.isCorrect;
        super.toJSON(data);
        return data;
    }
}

export interface IAnswer extends IEntity {
    questionId?: number;
    answerName?: string;
    isCorrect?: boolean;
}

export class QuestionDto implements IQuestionDto {
    id?: number;
    title?: string;
    category?: CategoryType;
    type?: AnswerType;
    score?: number;
    answers?: AnswerDto[];

    constructor(data?: IQuestionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.title = _data["title"];
            this.category = _data["category"];
            this.type = _data["type"];
            this.score = _data["score"];
            if (Array.isArray(_data["answers"])) {
                this.answers = [] as any;
                for (let item of _data["answers"])
                    this.answers!.push(AnswerDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): QuestionDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuestionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["category"] = this.category;
        data["type"] = this.type;
        data["score"] = this.score;
        if (Array.isArray(this.answers)) {
            data["answers"] = [];
            for (let item of this.answers)
                data["answers"].push(item.toJSON());
        }
        return data;
    }
}

export interface IQuestionDto {
    id?: number;
    title?: string;
    category?: CategoryType;
    type?: AnswerType;
    score?: number;
    answers?: AnswerDto[];
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}