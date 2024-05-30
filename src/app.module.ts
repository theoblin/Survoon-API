import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SurveyModule } from './survey/survey.module';
import { AnswerModule } from './answer/answer.module';
import { TemplateModule } from './template/template.module';
import { QuestionModule } from './question/question.module';
import { LanguageModule } from './language/language.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: ["dist/survey/survey.entity.js"],
      autoLoadEntities: true,
      synchronize: true,
    }), 
    ConfigModule.forRoot({isGlobal:true}),
    UserModule,
    SurveyModule,
    AnswerModule,
    TemplateModule,
    QuestionModule,
    LanguageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
