import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { SurveyController } from './survey/survey.controller';
import { UserService } from './user/user.service';
import { SurveyService } from './survey/survey.service';
import { ModelModule } from './model.module';
import { TypeOrmModule } from '@nestjs/typeorm';


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
    ModelModule 
  ],
  controllers: [AppController,UserController,SurveyController],
  providers: [AppService,UserService,SurveyService],
})
export class AppModule {}
