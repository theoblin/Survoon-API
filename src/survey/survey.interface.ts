
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
  }
  
  export interface ISurveyRO {
    survey: ISurveyData;
  }