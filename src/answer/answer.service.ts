import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";

import { UpdateAnswerDto } from './dto/update-answer.dto';
import { CreateAnswerDto } from './dto/create-aswer.dto';
import { IAnswerRO } from './answer.interface';
import { AnswerEntity } from './answer.entity';
import { SurveyEntity } from 'src/survey/survey.entity';

@Injectable()
export class AnswerService {

    constructor(
        @InjectRepository(AnswerEntity) 
        private readonly answerEntityRepository: Repository<AnswerEntity>, 
        @InjectRepository(SurveyEntity) 
        private readonly surveyEntityRepository: Repository<SurveyEntity>, 
    ) {}

    async getOneAnswerById(id:number) : Promise<IAnswerRO> {

        const queryBuilder = this.answerEntityRepository.createQueryBuilder('answer');
        const answer = await queryBuilder
          .leftJoinAndSelect('answer.survey', 'survey')
          .where('answer.id = :id', { id })
          .getOne();
    
        if (!answer) {
            const errors = { Answer: ' not found' };
            throw new HttpException({ errors }, 404);
        }

        return this.buildAnswerRO(answer)
    }

    async updateOneAnswer( dto: UpdateAnswerDto): Promise<IAnswerRO> {
        const queryBuilder = this.answerEntityRepository.createQueryBuilder('answer');
        const toUpdate = await queryBuilder
          .leftJoinAndSelect('answer.survey', 'survey')
          .where('answer.id = :id', { id:dto.id })
          .where('answer.survey = :id', { id:dto.survey })
          .getOne();
        if (!toUpdate) throw new HttpException('Answer not found', 403);
        toUpdate.lastUpdateDate = new Date();
        let updated = Object.assign(toUpdate, dto);
        const answer = await this.answerEntityRepository.save(updated);

        return this.buildAnswerRO(answer);
    }

    async createOneAnswer(surveyId:number, dto: CreateAnswerDto,ip:string)  : Promise<IAnswerRO>   {

        let answer = Object.assign(dto);

        answer.questionsList = dto.questionsList;
        answer.createdDate = new Date();
        answer.lastUpdateDate = new Date();
        answer.ip = ip;
        answer.valid = true;

        const survey = await this.surveyEntityRepository.findOne({where:{id:surveyId}})

        console.log(survey)
        if (!survey) throw new HttpException('Survey not found', 401);
        answer.survey = survey.id;

        const newAnswer = await this.answerEntityRepository.save(answer);

        return this.buildAnswerRO(newAnswer);
;
    }

    async deleteAnswerById(id:number) {
        return this.answerEntityRepository.delete({ id: id });
    }

    private buildAnswerRO(answer: AnswerEntity) {

        const answerRO = {
            id: answer.id,
            ip:answer.ip,
            questionsList:answer.questionsList,
            valid:answer.valid,
            createdDate: answer.createdDate,
            lastUpdateDate: answer.lastUpdateDate,
            survey:answer.survey.id
        };

        return { answer: answerRO };
    }

}