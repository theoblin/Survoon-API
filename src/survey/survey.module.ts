import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyEntity } from './survey.entity';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { AuthMiddleware } from 'src/user/auth.middleware';
import { UserEntity } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyEntity,UserEntity]), UserModule],
  providers: [SurveyService],
  controllers: [
    SurveyController
  ],
  exports: [SurveyService]
})
export class SurveyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: '/api/v2/survey', method: RequestMethod.GET},
        {path: '/api/v2/survey', method: RequestMethod.PUT},
        {path: '/api/v2/survey', method: RequestMethod.DELETE},
        {path: '/api/v2/survey', method: RequestMethod.POST});
  }
}