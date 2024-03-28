import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthMiddleware } from './auth.middleware';
import { SurveyService } from 'src/survey/survey.service';
import { SurveyEntity } from 'src/survey/survey.entity';
import { TemplateEntity } from 'src/template/template.entity';
import { TemplateService } from 'src/template/template.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,SurveyEntity,TemplateEntity])],
  providers: [UserService,SurveyService,TemplateService],
  controllers: [
    UserController
  ],
  exports: [UserService]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
       {path: '/api/v2/user', method: RequestMethod.PUT},
       {path: '/api/v2/user/surveys', method: RequestMethod.GET},
       {path: '/api/v2/user', method: RequestMethod.DELETE}
       );
  }
}