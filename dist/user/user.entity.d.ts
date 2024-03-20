import { SurveyEntity } from "src/survey/survey.entity";
export declare class UserEntity {
    id: number;
    email: string;
    password: string;
    type: string;
    createdDate: Date;
    survey: SurveyEntity;
}
