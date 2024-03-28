
export interface ITemplateData {
    id: number;
    config:string;
    name:string;
    visibility:string;
    active: boolean;
    createdDate: Date;
    lastUpdateDate: Date;
    user:number;
}
  
export interface ITemplateRO {
  template: ITemplateData;
}