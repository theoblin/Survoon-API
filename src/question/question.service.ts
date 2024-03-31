import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";

import { IQuestionRO } from './question.interface';
import { UserEntity } from 'src/user/user.entity';
import { QuestionEntity } from './question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { SurveyEntity } from 'src/survey/survey.entity';
import { SurveyService } from 'src/survey/survey.service';

@Injectable()
export class QuestionService {

    constructor(
        @InjectRepository(UserEntity) 
        private readonly UserEntityRepository: Repository<UserEntity>, 
        @InjectRepository(SurveyEntity) 
        private readonly SurveyEntityRepository: Repository<SurveyEntity>, 
        @InjectRepository(QuestionEntity) 
        private readonly QuestionEntityRepository: Repository<QuestionEntity>,

    ) {}

    async getOneQuestionById(id:number) : Promise<IQuestionRO> {

        const queryBuilder = this.QuestionEntityRepository.createQueryBuilder('question');
        const question = await queryBuilder
          .leftJoinAndSelect('question.user', 'user')
          .where('question.id = :id', { id })
          .getOne();
    
        if (!question) {
            const errors = { Question: ' not found' };
            throw new HttpException({ errors }, 404);
        }

        return this.buildQuestionRO(question)
    }

    async getUserQuestionById(id:number) : Promise<IQuestionRO[]>  { //TODO : Finir cette fonction (attention le password du user est renvoyé ici)
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
        if (!toUpdate) throw new HttpException('Question nor found', 403);
        dto.lastUpdateDate = new Date();
        let updated = Object.assign(toUpdate, dto);
        const question = await this.QuestionEntityRepository.save(updated);

        return this.buildQuestionRO(question);
    }

    async createOneQuestion(userId:number,surveyId:number, dto: CreateQuestionDto)  : Promise<IQuestionRO>   {

        let question = Object.assign(dto);

        question.name = dto.name;
        question.title = dto.title;
        question.config = dto.config;
        question.createdDate = new Date();
        question.lastUpdateDate = new Date();
        question.type = dto.type;
        question.visibility = dto.visibility;

        const creator = await this.UserEntityRepository.findOne({where:{id:userId}})

        if (!creator) throw new HttpException('User not found', 401);
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

        return this.buildQuestionRO(newQuestion,survey);
    }

    async deleteQuestionById(id:number) {
        return this.QuestionEntityRepository.delete({ id: id }); // TODO: Vérifier que ça enlève bien les relations survey
    }

    private buildQuestionRO(question: QuestionEntity,survey?:SurveyEntity) {

        const questionRO = {
            id: question.id,
            name: question.name,
            title: question.title,
            type: question.type,
            visibility: question.visibility,
            config:question.config,
            createdDate:question.createdDate,
            lastUpdateDate:question.lastUpdateDate,
            user:question.user.id,
            survey:survey.id,
        };

        return { question: questionRO };
    }

}