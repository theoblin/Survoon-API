import { QuestionTypeEntity } from "src/questionType/questionType.entity";
import { SurveyEntity } from "src/survey/survey.entity";
import { UserEntity } from "src/user/user.entity";
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn 
} from "typeorm";


@Entity()
export class QuestionEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column("json") 
    config:object;

    @Column() 
    name:string;

    @Column() 
    title:string;
  
    @Column() 
    createdDate: Date;
  
    @Column() 
    lastUpdateDate: Date;

    @Column() 
    visibility:string;

    @Column() 
    position:number;

    @ManyToOne(type => UserEntity, user => user.template, { onDelete: 'CASCADE' })
    user: UserEntity;

    @ManyToMany(() => SurveyEntity, { cascade: true, onDelete: 'CASCADE' })
    @JoinTable()
    surveys: SurveyEntity[];

    @ManyToOne(type => QuestionTypeEntity, questionType => questionType.question,{cascade:true})
    questionType: QuestionTypeEntity;
}