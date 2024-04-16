import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn 
} from "typeorm";
import { IsEmail } from 'class-validator';
import { SurveyEntity } from "src/survey/survey.entity";
import { TemplateEntity } from "src/template/template.entity";
import { LanguageEntity } from "src/language/language.entity";


@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true }) 
    @IsEmail()
    email:string;

    @Column() 
    password:string;

    @Column()
    type:string;

    @Column() 
    createdDate:string;

    @OneToMany(type => SurveyEntity, survey => survey.user)
    survey: SurveyEntity[]

    @OneToMany(type => TemplateEntity, template => template.survey)
    template: TemplateEntity[]

    @ManyToOne(type => LanguageEntity, language =>language.user,{ onDelete: 'CASCADE'})
    language: LanguageEntity;

}