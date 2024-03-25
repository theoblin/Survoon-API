export interface IUserData {
    id: number;
    email: string;
    type:string;
    createdDate:string;
  }
  
  export interface IUserRO {
    user: IUserData;
  }