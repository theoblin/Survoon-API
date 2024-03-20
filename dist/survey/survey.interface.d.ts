export interface ISurveyData {
    uuid: string;
    config: string;
    tags: string;
    name: string;
    createdDate: string;
    link: string;
}
export interface ISurveyRO {
    survey: ISurveyData;
}
