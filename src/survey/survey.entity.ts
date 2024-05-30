import { AnswerEntity } from "src/answer/answer.entity";
import { LanguageEntity } from "src/language/language.entity";
import { QuestionEntity } from "src/question/question.entity";
import { TemplateEntity } from "src/template/template.entity";
import { UserEntity } from "src/user/user.entity";
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn 
} from "typeorm";


@Entity()
export class SurveyEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column() 
    config:string;

    @Column() 
    name:string;

    @Column() 
    tags:string;

    @Column() 
    createdDate:Date;

    @Column() 
    lastUpdateDate:Date;

    @Column() 
    link:string;

    @Column() 
    entry:string;

    @Column() 
    visibility:string;

    @Column() 
    active:boolean;

    @ManyToOne(type => UserEntity, user => user.survey, { onDelete: 'CASCADE' })
    user: UserEntity;

    @OneToMany(type => AnswerEntity, answer => answer.survey, { onDelete: 'CASCADE' })
    answer: AnswerEntity[]

    @ManyToOne(type => TemplateEntity, template => template.survey)
    template: TemplateEntity;

    @ManyToMany(() => QuestionEntity, { cascade: true })
    @JoinTable()
    question: QuestionEntity[]

    @ManyToOne(type => LanguageEntity, language =>language.survey,{ onDelete: 'CASCADE'})
    language: LanguageEntity;
}