import { SurveyEntity } from "src/survey/survey.entity";
import { TemplateEntity } from "src/template/template.entity";
import { UserEntity } from "src/user/user.entity";
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn 
} from "typeorm";


@Entity()
export class LanguageEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column() 
    code:string;

    @Column() 
    data:string;

    @OneToMany(type => UserEntity, user => user.language, { onDelete: 'CASCADE' })
    user: UserEntity

    @OneToMany(type => SurveyEntity, survey => survey.language, { onDelete: 'CASCADE' })
    survey: SurveyEntity

    @OneToMany(type => TemplateEntity, template => template.language, { onDelete: 'CASCADE' })
    template: TemplateEntity


}