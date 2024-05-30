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
  
    @Column('json') 
    body: object;
  
    @Column() 
    valid: boolean;

    @Column() 
    position: number;

    @Column() 
    ended: boolean;

    @Column() 
    language: string;

    @Column({ unique: true }) 
    token: string;

    @Column({ unique: true }) 
    code: string;
  
    @Column() 
    createdDate: Date;
  
    @Column() 
    lastUpdateDate: Date;

    @ManyToOne(type => SurveyEntity, survey =>survey.answer,{ onDelete: 'CASCADE'})
    survey: SurveyEntity;

}