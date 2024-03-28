import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/user/auth.middleware';
import { SurveyEntity } from 'src/survey/survey.entity';
import { SurveyModule } from 'src/survey/survey.module';
import { UserEntity } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { SurveyService } from 'src/survey/survey.service';
import { TemplateEntity } from './template.entity';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateEntity,SurveyEntity,UserEntity]), SurveyModule, UserModule],
  providers: [TemplateService,SurveyService],
  controllers: [
    TemplateController
  ],
  exports: [TemplateService]
})
export class TemplateModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes( 
      {path: '/api/v2/template', method: RequestMethod.GET},
      {path: '/api/v2/template', method: RequestMethod.POST},
      {path: '/api/v2/template', method: RequestMethod.PUT},
      {path: '/api/v2/template', method: RequestMethod.DELETE});
  }
}