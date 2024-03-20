import { IUserData } from "src/user/user.interface";

export interface ISurveyData {
    uuid: string;
    config: string;
    tags: string;
    name:string;
    createdDate:string;
    link:string;
    user:IUserData;
  }
  
  export interface ISurveyRO {
    survey: ISurveyData;
  }