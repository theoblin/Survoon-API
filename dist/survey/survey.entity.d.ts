import { UserEntity } from "src/user/user.entity";
export declare class SurveyEntity {
    id: number;
    config: string;
    name: string;
    tags: string;
    createdDate: Date;
    link: string;
    user: UserEntity;
}
