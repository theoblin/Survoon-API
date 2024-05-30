import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/user/auth.middleware';
import { QuestionTypeEntity } from './questionType.entity';
import { QuestionTypeService } from './questionType.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/user.entity';
import { QuestionTypeController } from './questionType.controller';
import { LanguageEntity } from 'src/language/language.entity';


@Module({
  imports: [TypeOrmModule.forFeature([QuestionTypeEntity,UserEntity,LanguageEntity]),UserModule],
  providers: [QuestionTypeService,UserService],
  controllers:[QuestionTypeController],
  exports: [QuestionTypeService]
})
export class QuestionTypeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes( 
      {path: '/api/v2/questions/type', method: RequestMethod.GET},
  );
  }
}