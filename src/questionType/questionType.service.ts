import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { QuestionTypeEntity} from './questionType.entity';
import { IQuestionTypeRO } from './questionType.interface';

@Injectable()
export class QuestionTypeService {

    constructor(
        @InjectRepository(QuestionTypeEntity) 
        private readonly QuestionTypeEntityRepository: Repository<QuestionTypeEntity>, 
    ) {}


    async getAllQuestionTypes() : Promise<IQuestionTypeRO[]> {

       var QuestionTypeArray = [];

        const queryBuilder = this.QuestionTypeEntityRepository.createQueryBuilder('questionType');
        await queryBuilder
        .getMany()
        .then(questionTypes => {
            questionTypes.forEach((questionType) => QuestionTypeArray.push(this.buildQuestionTypeRO(questionType)))
       })

        return QuestionTypeArray
    }

    async getOneQuestionTypeById(id:number) : Promise<IQuestionTypeRO> {

        const queryBuilder = this.QuestionTypeEntityRepository.createQueryBuilder('questionType');
        const questionType = await queryBuilder
        .where('questionType.id = :id', {id:id})
        .getOne();

        if (!questionType) {
            const errors = { message: 'questionType not found' };
            throw new HttpException({ errors }, 404);
        }

        return this.buildQuestionTypeRO(questionType)
    }


    private buildQuestionTypeRO(questionType: QuestionTypeEntity) {
        
        const QuestionTypeRO = {
            id: questionType.id,
            name: questionType.name,
            config: questionType.config,
        };
        return { questionType: QuestionTypeRO };

    }
}