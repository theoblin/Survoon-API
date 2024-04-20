import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { LanguageEntity} from './language.entity';
import { ILanguageRO } from './language.interface';

@Injectable()
export class LanguageService {

    constructor(
        @InjectRepository(LanguageEntity) 
        private readonly LanguageEntityRepository: Repository<LanguageEntity>, 
    ) {}


    async getAllLanguages() : Promise<ILanguageRO[]> {

       var languageArray = [];

        const queryBuilder = this.LanguageEntityRepository.createQueryBuilder('language');
        await queryBuilder
        .getMany()
        .then(languages => {
            languages.forEach((language) => languageArray.push(this.buildLanguageRO(language)))
       })

        return languageArray
    }


    private buildLanguageRO(language: LanguageEntity) {
        
        const languageRO = {
            id: language.id,
            code: language.code,
            data: language.data,
        };
        return { language: languageRO };

    }
}