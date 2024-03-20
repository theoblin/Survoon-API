import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn 
} from "typeorm";
import { IsEmail } from 'class-validator';
import { SurveyEntity } from "src/survey/survey.entity";


@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column() 
    @IsEmail()
    email:string;

    @Column() 
    password:string;

    @Column() 
    type:string;

    @Column() 
    createdDate = new Date();

    @ManyToOne(type => SurveyEntity, survey => survey.user)
    @JoinColumn({name: 'surveyId',referencedColumnName: "id" })
    survey: SurveyEntity;

}