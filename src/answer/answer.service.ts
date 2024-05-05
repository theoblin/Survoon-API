import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import * as jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
const crypto = require('crypto');

import { UpdateAnswerDto } from './dto/update-answer.dto';
import { CreateAnswerDto } from './dto/create-aswer.dto';
import { IAnswerRO } from './answer.interface';
import { AnswerEntity } from './answer.entity';
import { SurveyEntity } from 'src/survey/survey.entity';

import { HUGG_LANGUAGE_DETECTION_API_ENDPOINT, HUGG_LANGUAGE_DETECTION_SECRET, SECRET, SECRET_2 } from '../config';

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


    async getOneAnswerByCode(code:string,surveyId:number) : Promise<IAnswerRO> {

        const queryBuilder = this.answerEntityRepository.createQueryBuilder('answer');
        const answer = await queryBuilder
          .leftJoinAndSelect('answer.survey', 'survey')
          .where('answer.code = :code', { code })
          .andWhere('survey.id = :id', { id:surveyId })
          .getOne();

        if (!answer) {
            const errors = { Answer: ' not found' };
            throw new HttpException({ errors }, 404);
        }

        return this.buildAnswerRO(answer)
    }
    async getSurveyAnswersById(id:number) : Promise<IAnswerRO[]>  {
        const answersArray = []
        await this.answerEntityRepository.createQueryBuilder("answer")
        .leftJoinAndSelect("answer.survey", "survey")
        .where("survey.id = :id", {id:id})
        .getMany().then(answers => {
            answers.forEach((answer) => answersArray.push(this.buildAnswerRO(answer)))
       })

       if (answersArray.length <= 0) {
        const errors = { Answer: ' not found' };
        throw new HttpException({ errors }, 404);
    }
        return answersArray
    }

    async updateOneAnswer( dto: UpdateAnswerDto,surveyId:number): Promise<IAnswerRO> {

        console.log(dto)
        const queryBuilder = this.answerEntityRepository.createQueryBuilder('answer');
        const toUpdate = await queryBuilder
          .leftJoinAndSelect('answer.survey', 'survey')
          .where('answer.code = :code', { code:dto.code })
          .andWhere('survey.id = :id', { id:surveyId })
          .getOne();
        if (!toUpdate) throw new HttpException('Answer not found', 404);
        toUpdate.lastUpdateDate = new Date();
        dto.token = this.generateAnswerToken(dto,surveyId);
        let updated = Object.assign(toUpdate, dto);

        const answer = await this.answerEntityRepository.save(updated);


        return this.buildAnswerRO(answer);
    }

    async createOneAnswer(surveyId:number, dto: CreateAnswerDto,ip:string)  : Promise<IAnswerRO>   {

        let answer = Object.assign(dto);

        answer.body = dto.body;
        answer.createdDate = new Date();
        answer.lastUpdateDate = new Date();
        answer.ip = ip;
        answer.valid = false;
        answer.ended = dto.ended;
        if(!dto.code){
            dto.code = uuid()
        }
        answer.code = dto.code
        answer.position = dto.position;

        answer.token = this.generateAnswerToken(answer,surveyId);

 /*        const textToDetect = await this.returnQuestionComment(dto.body,"Qreco_justif")
        .then((question) => {
            return question.value
        }) */
/*         answer.language = await this.detectLanguage(textToDetect)
        .then((response) => {
           return response[0][0].label;
        }); */

        answer.language = "en";

        const survey = await this.surveyEntityRepository.findOne({where:{id:surveyId}})

        if (!survey || !surveyId) throw new HttpException('Survey not found', 404);
        answer.survey = survey.id;

        const newAnswer = await this.answerEntityRepository.save(answer);


        return this.buildAnswerRO(newAnswer);
    }

    async deleteAnswerById(id:number) {
        return this.answerEntityRepository.delete({ id: id });
    }

    private buildAnswerRO(answer: AnswerEntity) {

        const answerRO = {
            id: answer.id,
            ip:answer.ip,
            body:answer.body,
            valid:answer.valid,
            ended:answer.ended,
            position:answer.position,
            language:answer.language,
            token:answer.token,
            code:answer.code,
            createdDate: answer.createdDate,
            lastUpdateDate: answer.lastUpdateDate,
            survey:answer.survey.id
        };

        return { answer: answerRO };
    }

    async detectLanguage(sentence:string) {
        const response = await fetch(
            HUGG_LANGUAGE_DETECTION_API_ENDPOINT,
            {
                headers: { Authorization: "Bearer "+HUGG_LANGUAGE_DETECTION_SECRET },
                method: "POST",
                body: JSON.stringify({"inputs": sentence}),
            }
        );
        const result = await response.json();
        return result;
        
    }

    generateAnswerToken(answer,surveyId) {
        const iat = Math.floor(Date.now() / 1000)
        const exp = iat + 3600

        return jwt.sign({
            code: answer.code,
            ended:answer.ended,
            surveyId:surveyId,
            exp:exp
        }, SECRET);
    }

    async returnQuestionComment(list:string,questionName:string){
        const reponse = JSON.parse(list)
        return reponse.find((repQuest) => repQuest.name == questionName)
    }

    async createCode(surveyId:number,uuid:string){
/*     
            const iv = "cd6e41940d053fa2ccd7dbee9de7366c" 
            const key = "12345678901234567890123456789012"
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'));
            let encryptedData = cipher.update(surveyId+"#=#"+uuid, 'utf8', 'hex');
            encryptedData += cipher.final('hex');
        
            console.log(encryptedData) */

            const encryptedData = (Buffer.from(surveyId+"#=#"+uuid).toString('base64'))
            return encryptedData
    }

    async readCode(code:string){
        const iv = "cd6e41940d053fa2ccd7dbee9de7366c" 
        const key = "12345678901234567890123456789012"
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'));
        let decryptedData = decipher.update(code, 'hex', 'utf8');
        decryptedData += decipher.final('utf8');
        console.log(decryptedData)
        return decryptedData;
    }
}