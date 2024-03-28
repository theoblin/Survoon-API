import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";

import { ITemplateRO } from './template.interface';
import { UserEntity } from 'src/user/user.entity';
import { TemplateEntity } from './template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplateService {

    constructor(
        @InjectRepository(UserEntity) 
        private readonly UserEntityRepository: Repository<UserEntity>, 
        @InjectRepository(TemplateEntity) 
        private readonly TemplateEntityRepository: Repository<TemplateEntity>
    ) {}

    async getOneTemplateById(id:number) : Promise<ITemplateRO> {

        const queryBuilder = this.TemplateEntityRepository.createQueryBuilder('template');
        const template = await queryBuilder
          .leftJoinAndSelect('template.user', 'user')
          .where('template.id = :id', { id })
          .getOne();
    
        if (!template) {
            const errors = { Template: ' not found' };
            throw new HttpException({ errors }, 404);
        }

        return this.buildTemplateRO(template)
    }

    async getUserTemplateById(id:number) : Promise<ITemplateRO[]>  {
        const templateArray = []
        await this.TemplateEntityRepository.createQueryBuilder("template")
        .leftJoinAndSelect("template.user", "user")
        .where("user.id = :id", {id:id})
        .getMany().then(templates => {
            templates.forEach((template) => templateArray.push(this.buildTemplateRO(template)))
       })

       if (templateArray.length <= 0) {
        const errors = { Template: ' not found' };
        throw new HttpException({ errors }, 404);
    }
        return templateArray
    }

 

    async updateOneTemplate( dto: UpdateTemplateDto): Promise<ITemplateRO> {
        const queryBuilder = this.TemplateEntityRepository.createQueryBuilder('template');
        const toUpdate = await queryBuilder
          .leftJoinAndSelect('template.survey', 'survey')
          .where('template.id = :id', { id:dto.id })
          .where('template.user = :id', { id:dto.user })
          .getOne();
        if (!toUpdate) throw new HttpException('Template not found', 403);
        toUpdate.lastUpdateDate = new Date();
        let updated = Object.assign(toUpdate, dto);
        const template = await this.TemplateEntityRepository.save(updated);

        return this.buildTemplateRO(template);
    }

    async createOneTemplate(userId:number, dto: CreateTemplateDto)  : Promise<ITemplateRO>   {

        let template = Object.assign(dto);

        template.name = dto.name;
        template.config = dto.config;
        template.createdDate = new Date();
        template.lastUpdateDate = new Date();
        template.active = true;
        template.visibility = dto.visibility;

        const creator = await this.UserEntityRepository.findOne({where:{id:userId}})

        if (!creator) throw new HttpException('User not found', 401);
        template.user = creator.id;

        const newTemplate = await this.TemplateEntityRepository.save(template);

        return this.buildTemplateRO(newTemplate);
;
    }

    async deleteTemplateById(id:number) {
        return this.TemplateEntityRepository.delete({ id: id });
    }

    private buildTemplateRO(template: TemplateEntity) {

        const templateRO = {
            id: template.id,
            name: template.name,
            active: template.active,
            visibility: template.visibility,
            config:template.config,
            createdDate:template.createdDate,
            lastUpdateDate:template.lastUpdateDate,
            user:template.user.id
        };

        return { template: templateRO };
    }

}