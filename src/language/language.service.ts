import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { LanguageEntity} from './language.entity';

@Injectable()
export class LanguageService {

    constructor(
        @InjectRepository(LanguageEntity) 
        private readonly LanguageEntityRepository: Repository<LanguageEntity>, 
    ) {}

    

}