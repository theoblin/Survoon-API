import { LanguageEntity } from "src/language/language.entity";

export interface ISurveyData {
    id: number;
    config: string;
    tags: string;
    name:string;
    createdDate:Date;
    lastUpdateDate:Date;
    link:string;
    visibility:string;
    active:boolean;
    user:number;
    template:number;
    language:LanguageEntity
  }
  
  export interface ISurveyRO {
    survey: ISurveyData;
  }