import { SurveyEntity } from "src/survey/survey.entity";
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn 
} from "typeorm";


@Entity()
export class AnswerEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    ip: string;
  
    @Column() 
    questionsList: string;
  
    @Column() 
    valid: boolean;
  
    @Column() 
    createdDate: Date;
  
    @Column() 
    lastUpdateDate: Date;

    @ManyToOne(type => SurveyEntity, survey =>survey.answer)
    survey: SurveyEntity;

}