
export interface IQuestionTypeData {
    id: number;
    name:string;
    config:string;
    length:string;
}
  
export interface IQuestionTypeRO {
  questionType: IQuestionTypeData;
}