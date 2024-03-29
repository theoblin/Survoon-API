import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/user/auth.middleware';
import { SurveyEntity } from 'src/survey/survey.entity';
import { SurveyModule } from 'src/survey/survey.module';
import { UserEntity } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { SurveyService } from 'src/survey/survey.service';
import { QuestionEntity } from './question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity,SurveyEntity,UserEntity]), SurveyModule, UserModule],
  providers: [QuestionService,SurveyService],
  controllers: [
    QuestionController
  ],
  exports: [QuestionService]
})
export class QuestionModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes( 
      {path: '/api/v2/question', method: RequestMethod.GET},
      {path: '/api/v2/question', method: RequestMethod.POST},
      {path: '/api/v2/question', method: RequestMethod.PUT},
      {path: '/api/v2/question', method: RequestMethod.DELETE});
  }
}