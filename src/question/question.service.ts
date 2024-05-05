import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";

import { IQuestionRO } from './question.interface';
import { UserEntity } from 'src/user/user.entity';
import { QuestionEntity } from './question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { SurveyEntity } from 'src/survey/survey.entity';
import { TemplateEntity } from 'src/template/template.entity';
import { QuestionTypeEntity } from 'src/questionType/questionType.entity';

@Injectable()
export class QuestionService {

    constructor(
        @InjectRepository(UserEntity) 
        private readonly UserEntityRepository: Repository<UserEntity>, 
        @InjectRepository(SurveyEntity) 
        private readonly SurveyEntityRepository: Repository<SurveyEntity>, 
        @InjectRepository(QuestionEntity) 
        private readonly QuestionEntityRepository: Repository<QuestionEntity>,
        @InjectRepository(TemplateEntity) 
        private readonly TemplateEntityRepository: Repository<TemplateEntity>,
        @InjectRepository(QuestionTypeEntity) 
        private readonly QuestionTypeEntityRepository: Repository<QuestionTypeEntity>,
    ) {}

    async getOneQuestionById(id:number) : Promise<IQuestionRO> {

        const queryBuilder = this.QuestionEntityRepository.createQueryBuilder('question');
        const question = await queryBuilder
          .leftJoinAndSelect('question.user', 'user')
          .leftJoinAndSelect('question.questionType', 'questionType')
          .where('question.id = :id', { id })
          .getOne();
    
        if (!question) {
            const errors = { Question: ' not found' };
            throw new HttpException({ errors }, 404);
        }

        return this.buildQuestionRO(question)
    }

    async getUserQuestionById(id:number) : Promise<IQuestionRO[]>  { 
        const questionArray = []
        await this.QuestionEntityRepository.createQueryBuilder("question")
        .leftJoinAndSelect("question.user", "user")
        .where("user.id = :id", {id:id})
        .getMany().then(questions => {
            questions.forEach((question) => questionArray.push(this.buildQuestionRO(question)))
       })

       if (questionArray.length <= 0) {
        const errors = { Question: ' not found' };
        throw new HttpException({ errors }, 404);
    }
        return questionArray
    }

    async updateOneQuestion( dto: UpdateQuestionDto,userId:number): Promise<IQuestionRO> {


        let toUpdate = await this.QuestionEntityRepository.createQueryBuilder("question")
        .leftJoinAndSelect("question.user", "user")
        .where("user.id = :id", {id:userId})
        .where('question.id = :id', {id:dto.id })
        .getOne();

        if (dto.questionType){
            try{
                const queryBuilder = this.QuestionTypeEntityRepository.createQueryBuilder('questionType');
                const questionType = await queryBuilder
                  .where('questionType.id = :id', {  id:dto.questionType })
                  .getOne();
                
                  dto.questionType = questionType
            }catch(error){
                throw new HttpException({message:error}, 500);
            }
        }

        if (!toUpdate) throw new HttpException('Question not found', 404);
        dto.lastUpdateDate = new Date();
        let updated = Object.assign(toUpdate, dto);


        await this.QuestionEntityRepository.update(toUpdate.id, {
            ...(dto.questionType && { questionType: dto.questionType }),
            ...(dto.name && { name: dto.name }),
            ...(dto.title && { title: dto.title }),
            ...(dto.position && { position: dto.position }),
            ...(dto.config && { config: dto.config })

        });

        return this.buildQuestionRO(updated);
    }

    async createOneQuestion(userId:number,surveyId:number,templateId:number, dto: CreateQuestionDto)  : Promise<IQuestionRO>   {

        let question = Object.assign(dto);
        let params = {"survey":null,"template":null};

        question.name = dto.name;
        question.position = dto.position;
        question.title = "The title is here";
        question.config = [{"fontSize":"10"}];
        question.createdDate = new Date();
        question.lastUpdateDate = new Date();
        question.visibility = "private";

        const questionType = await this.QuestionTypeEntityRepository.findOne({where:{id:1}})
        if (!questionType) throw new HttpException('QuestionType error', 400);
        question.questionType = questionType;


        const creator = await this.UserEntityRepository.findOne({where:{id:userId}})

        if (!creator) throw new HttpException('User not found', 404);
        question.user = creator.id;

        const newQuestion = await this.QuestionEntityRepository.save(question);

        const survey = await this.SurveyEntityRepository
        .createQueryBuilder('survey')
        .leftJoinAndSelect('survey.question', 'question')
        .where('survey.id = :id', { id: surveyId })
        .getOne();

        if (!survey) throw new HttpException('Survey not found', 401);

        survey.question.push(newQuestion)

        this.SurveyEntityRepository.save(survey)

        params.survey = survey

        if(templateId){
            const template = await this.TemplateEntityRepository
            .createQueryBuilder('template')
            .leftJoinAndSelect('template.question', 'question')
            .where('template.id = :id', { id: templateId })
            .getOne();
    
            if (!template) throw new HttpException('Template not found', 401);
    
            template.question.push(newQuestion)
    
            this.TemplateEntityRepository.save(template)

            params.template = template
        }
  
        return this.buildQuestionRO(newQuestion,params);
    }

    async deleteQuestionById(id:number) {
        return this.QuestionEntityRepository.delete({ id: id }); 
    }

    private buildQuestionRO(question: QuestionEntity,params?) {
        
        const questionRO = {
            id: question.id,
            name: question.name,
            title: question.title,
            questionType: question.questionType,
            visibility: question.visibility,
            config:question.config,
            position:question.position,
            createdDate:question.createdDate,
            lastUpdateDate:question.lastUpdateDate,
            user:question.user.id,
            survey:null,
            template:null
        };

        if(params){
            params.survey?questionRO.survey =  params.survey.id:null;
            params.template?questionRO.template =  params.template.id:null;
        }
       

        return { question: questionRO };
    }

}