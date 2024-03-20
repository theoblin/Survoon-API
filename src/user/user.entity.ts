import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
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
    createdDate:string;


    @OneToMany(type => SurveyEntity, survey => survey.user)
    survey: SurveyEntity[]

}