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
import { TemplateEntity } from 'src/template/template.entity';
import { LanguageEntity } from 'src/language/language.entity';
import { QuestionTypeEntity } from 'src/questionType/questionType.entity';
import { QuestionTypeService } from 'src/questionType/questionType.service';
import { QuestionTypeModule } from 'src/questionType/questionType.module';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity,SurveyEntity,UserEntity,TemplateEntity,LanguageEntity,QuestionTypeEntity]), SurveyModule, UserModule,QuestionTypeModule],
  providers: [QuestionService,SurveyService,QuestionTypeService],
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
      {path: '/api/v2/question/:slug', method: RequestMethod.GET},
      {path: '/api/v2/question', method: RequestMethod.POST},
      {path: '/api/v2/question', method: RequestMethod.PUT},
      {path: '/api/v2/question', method: RequestMethod.DELETE});
  }
}