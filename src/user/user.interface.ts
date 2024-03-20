export interface IUserData {
    uuid: string;
    email: string;
    token: string;
    type:string;
    createdDate:string;
  }
  
  export interface IUserRO {
    user: IUserData;
  }