import { SurveyEntity } from "src/survey/survey.entity";
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
export class QuestionEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column() 
    config:string;

    @Column() 
    name:string;

    @Column() 
    title:string;
  
    @Column() 
    type: string;
  
    @Column() 
    createdDate: Date;
  
    @Column() 
    lastUpdateDate: Date;

    @Column() 
    visibility:string;

    @ManyToOne(type => UserEntity, user => user.template)
    user: UserEntity;

}