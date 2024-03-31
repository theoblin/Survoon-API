import { SurveyEntity } from "src/survey/survey.entity";
import { UserEntity } from "src/user/user.entity";
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn 
} from "typeorm";


@Entity()
export class TemplateEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column() 
    config:string;

    @Column() 
    name:string;
  
    @Column() 
    active: boolean;
  
    @Column() 
    createdDate: Date;
  
    @Column() 
    lastUpdateDate: Date;

    @Column() 
    visibility:string;

    @OneToMany(type => SurveyEntity, survey => survey.template)
    survey: SurveyEntity[]

    @ManyToOne(type => UserEntity, user => user.template, { onDelete: 'CASCADE' })
    user: UserEntity;

}