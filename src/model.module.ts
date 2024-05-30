import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyEntity} from "./survey/survey.entity";
import { UserEntity } from './user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SurveyEntity,UserEntity])],
    exports: [TypeOrmModule],
})
export class ModelModule {}