import { QuestionEntity } from "src/question/question.entity";
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn 
} from "typeorm";


@Entity()
export class QuestionTypeEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column() 
    name:string;

    @Column() 
    config:string;

    @OneToMany(type => QuestionEntity, question => question.questionType)
    question: QuestionEntity[]


}