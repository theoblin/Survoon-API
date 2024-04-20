import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/user/auth.middleware';
import { LanguageEntity } from './language.entity';
import { LanguageService } from './language.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/user.entity';
import { LanguageController } from './language.controller';


@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity,UserEntity]),UserModule],
  providers: [LanguageService,UserService],
  controllers:[LanguageController],
  exports: [LanguageService]
})
export class LanguageModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes( 
      {path: '/api/v2/languages', method: RequestMethod.GET},
  );
  }
}