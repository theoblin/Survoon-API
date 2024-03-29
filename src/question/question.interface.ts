
export interface IQuestionData {
    id: number;
    config:string;
    name:string;
    visibility:string;
    type: string;
    createdDate: Date;
    lastUpdateDate: Date;
    user:number;
}
  
export interface IQuestionRO {
  question: IQuestionData;
}