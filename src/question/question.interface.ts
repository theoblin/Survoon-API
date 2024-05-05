import { QuestionTypeEntity } from "src/questionType/questionType.entity";

export interface IQuestionData {
    id: number;
    config:object;
    name:string;
    visibility:string;
    position:number;
    questionType: QuestionTypeEntity;
    createdDate: Date;
    lastUpdateDate: Date;
    user:number;
}
  
export interface IQuestionRO {
  question: IQuestionData;
}