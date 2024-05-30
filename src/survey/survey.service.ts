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

    async getOneSurveyById(id:number) : Promise<ISurveyRO> {

        const queryBuilder = this.surveyEntityRepository.createQueryBuilder('survey');
        const survey = await queryBuilder
          .leftJoinAndSelect('survey.user', 'user')
          .leftJoinAndSelect("survey.template", "template")
          .leftJoinAndSelect('survey.question', 'question')
          .leftJoinAndSelect('question.questionType', 'questionType')
          .where('survey.id = :id', { id })
          .getOne();

        if (!survey) {
            const errors = { message: 'survey not found' };
            throw new HttpException({ errors }, 404);
        }

        return this.buildSurveyRO(survey)
    }

    async getOneSurveyByIdSecure(id:number,userId:number) : Promise<ISurveyRO> {

        const queryBuilder = this.surveyEntityRepository.createQueryBuilder('survey');
        const survey = await queryBuilder
          .leftJoinAndSelect('survey.user', 'user')
          .leftJoinAndSelect("survey.template", "template")
          .leftJoinAndSelect('survey.question', 'question')
          .leftJoinAndSelect('question.questionType', 'questionType')
          .where(
            new Brackets((qb1) => {
              qb1.where('survey.id = :id', { id }).andWhere('survey.user.id = :userId', { userId });
            })
          )
          .getOne();

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

    async updateOneSurvey(dto: UpdateSurveyDto,userId:number) : Promise<ISurveyRO>  { 
        let toUpdate = await this.surveyEntityRepository.createQueryBuilder("survey")
        .leftJoinAndSelect("survey.user", "user")
        .where("user.id = :id", {id:userId})
        .where('survey.id = :id', {id:dto.id })
        .getOne();

        if (!toUpdate) throw new HttpException('Survey nor found', 403);
        dto.lastUpdateDate = new Date();
        let updated = Object.assign(toUpdate, dto);

        await this.surveyEntityRepository.update(toUpdate.id, {
            ...(dto.name && { name: dto.name }),
            ...(dto.config && { config: dto.config }),
            ...(dto.entry && { entry: dto.entry }),
        });

        return this.buildSurveyRO(updated);
    }

    async createOneSurvey(userId:number, dto: CreateSurveyDto)  : Promise<ISurveyRO>   {

        let params = {"template":null};

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
            params.template = template
        }


        const newSurvey = await this.surveyEntityRepository.save(survey);


        await this.surveyEntityRepository.update(newSurvey.id, {
            ...({ link: this.encodeCode(newSurvey.id,"") }),
        });


        return this.buildSurveyRO(newSurvey,params);
    }

    async deleteSurveyById(id:number) {
        return this.surveyEntityRepository.delete({ id: id });
    }

    decodeCode(encryptedData:string) {
        const parse = Buffer.from(encryptedData, 'base64').toString('ascii')
        return {surveyId:parse.split('#=#')[0],answerCode:parse.split('#=#')[1]};
    }
    
    encodeCode(surveyId:number,answerCode:string) {
      const code = (Buffer.from(surveyId+"#=#"+answerCode).toString('base64'))
    
      return code;
    }

    private buildSurveyRO(survey: SurveyEntity,params?) {

        const surveyRO = {
            id: survey.id,
            config:survey.config,
            tags:survey.tags,
            name:survey.name,
            link:survey.link,
            entry:survey.entry,
            visibility:survey.visibility,
            active:survey.active,
            createdDate:survey.createdDate,
            lastUpdateDate:survey.lastUpdateDate,
            user:survey.user.id,
            template:null,
            question:survey.question,
            language:survey.language
        };

        if(params){
            params.template?surveyRO.template = params.template.id:null
        }


        return { survey: surveyRO };
    }

}




