import { LanguageEntity } from "src/language/language.entity";

export interface IUserData {
    id: number;
    email: string;
    type:string;
    createdDate:string;
    language:LanguageEntity;
  }
  
  export interface IUserRO {
    user: IUserData;
  }