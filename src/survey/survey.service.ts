import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { ISurveyRO } from './survey.interface';
import { SurveyEntity } from './survey.entity'; 
import { UserEntity } from '../user/user.entity'; 
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SurveyService {

    constructor(
        @InjectRepository(SurveyEntity) 
        private readonly surveyEntityRepository: Repository<SurveyEntity>, 
        @InjectRepository(UserEntity) 
        private readonly userEntityRepository: Repository<UserEntity>, 
    ) {}

    async getOneSurveyById(id:string) {
        return id;
    }

    async updateOneSurvey(id: number, dto: UpdateSurveyDto) {
        return {id,dto};
    }

    async createOneSurvey(userId:number, dto: CreateSurveyDto) /* : Promise<IUserRO> */  {

        let survey = new SurveyEntity();
        survey.config = dto.config;
        survey.name = dto.name;
        survey.createdDate = new Date();
        survey.link = dto.link;
        survey.tags = dto.tags;

        const creator = await this.userEntityRepository.findOne({where:{id:userId}})
        survey.user = creator;

        const newSurvey = await this.surveyEntityRepository.save(survey);
        return newSurvey;
    }

    async deleteSurveyById(id:string,userId:string) {
        return 'deleteSurveyById';
    }

}




