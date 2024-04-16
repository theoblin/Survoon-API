import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/user/auth.middleware';
import { LanguageEntity } from './language.entity';
import { LanguageService } from './language.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity,UserEntity]),UserModule],
  providers: [LanguageService,UserService],
  exports: [LanguageService]
})
export class LanguageModule implements NestModule {
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