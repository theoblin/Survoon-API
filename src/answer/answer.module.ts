import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from './answer.entity';
import { AuthMiddleware } from 'src/user/auth.middleware';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { SurveyEntity } from 'src/survey/survey.entity';
import { SurveyModule } from 'src/survey/survey.module';
import { UserEntity } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity,SurveyEntity,UserEntity]), SurveyModule, UserModule],
  providers: [AnswerService],
  controllers: [
    AnswerController
  ],
  exports: [AnswerService]
})
export class AnswerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes( {path: '/api/v2/answer', method: RequestMethod.DELETE});
  }
}