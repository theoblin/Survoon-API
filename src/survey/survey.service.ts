import { HttpException, Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { ISurveyRO } from './survey.interface';
import { SurveyEntity } from './survey.entity'; 
import { UserEntity } from '../user/user.entity'; 
import { Brackets, Repository } from 'typeorm';
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

    async getOneSurveyById(id:number,userId:number) : Promise<ISurveyRO> {

        const queryBuilder = this.surveyEntityRepository.createQueryBuilder('survey');
        const survey = await queryBuilder
          .leftJoinAndSelect('survey.user', 'user')
          .leftJoinAndSelect("survey.template", "template")
          .leftJoinAndSelect('survey.question', 'question')
          .where(
            new Brackets((qb1) => {
              qb1.where('survey.id = :id', { id }).andWhere('survey.user.id = :userId', { userId });
            })
          )
          .getOne();
          console.log(survey)

        if (!survey) {
            const errors = { message: 'survey not found' };
            throw new HttpException({ errors }, 404);
        }

        return this.buildSurveyRO(survey)
    }

    async getUserSurveyById(id:number) : Promise<ISurveyRO[]>  {
        const surveysArray = []
        await this.surveyEntityRepository.createQueryBuilder("survey")
        .leftJoinAndSelect("survey.template", "template")
        .leftJoinAndSelect("survey.language", "language")
        .leftJoinAndSelect('survey.question', 'question')
        .leftJoinAndSelect("survey.user", "user")
        .where("user.id = :id", {id:id})
        .getMany().then(surveys => {
            surveys.forEach((survey) => surveysArray.push(this.buildSurveyRO(survey)))
       })

       if (surveysArray.length <= 0) {
            const errors = { message: ' not found' };
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

    async createOneSurvey(userId:number, dto: CreateSurveyDto)  : Promise<ISurveyRO>   {

        let survey = Object.assign(dto);

        survey.name = dto.name;
        survey.createdDate = new Date();
        survey.lastUpdateDate = new Date();

        survey.config = "";
        survey.tags = "";
        survey.active ="";
        survey.visibility = "";
        survey.link = "";

        if (!userId) throw new HttpException('User required', 403);
        const creator = await this.userEntityRepository.findOne({where:{id:userId}})
        if (!creator) throw new HttpException('User not found', 401);
        survey.user = creator.id;

        const language = await this.languageEntityRepository.findOne({where:{code:dto.language}})
        if (!language) throw new HttpException('Language not found', 401);
        survey.language = language.id;

        if(!dto.template){
            survey.template = 1;
        }else{
            const template = await this.templateEntityRepository.findOne({where:{id:dto.template}})
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
            template:survey.template.id,
            question:survey.question
        };

        return { survey: surveyRO };
    }

}




