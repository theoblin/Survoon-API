import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/user/user.entity";
import {
    Column,
    Entity,
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
    link:string;

    @OneToMany(type => UserEntity, user => user.survey)
    user: UserEntity

}