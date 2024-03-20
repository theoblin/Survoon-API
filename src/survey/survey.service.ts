import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { ISurveyRO } from './survey.interface';
/* import { SurveyEntity } from './survey.entity'; */
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SurveyService {

    constructor(
        /* @InjectRepository(SurveyEntity) */
        /* private readonly surveyEntityRepository: Repository<SurveyEntity>, */
        private configService: ConfigService
    ) {}

    async getOneSurveyById(id:string) {
        return id;
    }

    async updateOneSurvey(id: number, dto: UpdateSurveyDto) {
        return {id,dto};
    }

    async createOneSurvey(dto: CreateSurveyDto)/* : Promise<IUserRO> */ {
        return 'createOneSurvey';
    }

    async deleteSurveyById(id:string,userId:string) {
        return 'deleteSurveyById';
    }

}




