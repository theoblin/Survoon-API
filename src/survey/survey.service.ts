import { HttpException, Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { ISurveyRO } from './survey.interface';
import { SurveyEntity } from './survey.entity'; 
import { UserEntity } from '../user/user.entity'; 
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { TemplateEntity } from 'src/template/template.entity';
import { LanguageEntity } from 'src/language/language.entity';

@Injectable()
export class SurveyService {

    constructor(
        @InjectRepository(SurveyEntity) 
        private readonly surveyEntityRepository: Repository<SurveyEntity>, 
        @InjectRepository(UserEntity) 
        private readonly userEntityRepository: Repository<UserEntity>, 
        @InjectRepository(TemplateEntity) 
        private readonly templateEntityRepository: Repository<TemplateEntity>, 
        @InjectRepository(LanguageEntity) 
        private readonly languageEntityRepository: Repository<LanguageEntity>, 
    ) {}

    async getOneSurveyById(id:number) : Promise<ISurveyRO> {

        const queryBuilder = this.surveyEntityRepository.createQueryBuilder('survey');
        const survey = await queryBuilder
          .leftJoinAndSelect('survey.user', 'user')
          .where('survey.id = :id', { id })
          .getOne();

        if (!survey) {
            const errors = { Survey: ' not found' };
            throw new HttpException({ errors }, 404);
        }

        return this.buildSurveyRO(survey)
    }

    async getUserSurveyById(id:number) : Promise<ISurveyRO[]>  {
        const surveysArray = []
        await this.surveyEntityRepository.createQueryBuilder("survey")
        .leftJoinAndSelect("survey.user", "user")
        .where("user.id = :id", {id:id})
        .getMany().then(surveys => {
            surveys.forEach((survey) => surveysArray.push(this.buildSurveyRO(survey)))
       })

       if (surveysArray.length <= 0) {
        const errors = { Survey: ' not found' };
        throw new HttpException({ errors }, 404);
    }
        return surveysArray
    }

    async updateOneSurvey(dto: UpdateSurveyDto) : Promise<ISurveyRO>  { 
        let toUpdate = await this.surveyEntityRepository.findOne({where:{id:dto.id}});
        if (!toUpdate) throw new HttpException('Survey nor found', 403);
        dto.lastUpdateDate = new Date();
        let updated = Object.assign(toUpdate, dto);
        const survey = await this.surveyEntityRepository.save(updated);

        return this.buildSurveyRO(survey);
    }

    async createOneSurvey(userId:number, dto: CreateSurveyDto,templateId:number,languageCode:string)  : Promise<ISurveyRO>   {

        let survey = Object.assign(dto);

        survey.config = dto.config;
        if (!dto.name) throw new HttpException('Name required', 403);
        survey.name = dto.name;
        survey.createdDate = new Date();
        survey.lastUpdateDate = new Date();
        if (!dto.link) throw new HttpException('Link required', 403);
        survey.link = dto.link;
        survey.tags = dto.tags;
        survey.visibility = dto.visibility;
        survey.active = dto.active;

        if (!userId) throw new HttpException('User required', 403);
        const creator = await this.userEntityRepository.findOne({where:{id:userId}})
        if (!creator) throw new HttpException('User not found', 401);
        survey.user = creator.id;

        if (!languageCode) throw new HttpException('Language required', 403);
        const language = await this.languageEntityRepository.findOne({where:{code:languageCode}})
        if (!language) throw new HttpException('Language not found', 401);
        survey.language = language.id;

        if(!templateId){
            survey.template = 1;
        }else{
            const template = await this.templateEntityRepository.findOne({where:{id:templateId}})
            if (!template) throw new HttpException('Template not found', 401);
            survey.template = template.id;
        }

        const newSurvey = await this.surveyEntityRepository.save(survey);
        return this.buildSurveyRO(newSurvey);
    }

    async deleteSurveyById(id:number) {
        return this.surveyEntityRepository.delete({ id: id });
    }

    private buildSurveyRO(survey: SurveyEntity) {

        const surveyRO = {
            id: survey.id,
            config:survey.config,
            tags:survey.tags,
            name:survey.name,
            link:survey.link,
            visibility:survey.visibility,
            active:survey.active,
            createdDate:survey.createdDate,
            lastUpdateDate:survey.lastUpdateDate,
            user:survey.user.id,
            template:survey.template.id
        };

        return { survey: surveyRO };
    }

}




