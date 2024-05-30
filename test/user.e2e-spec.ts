
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UserModule } from '../src/user/user.module'; 
import { UserService } from '../src/user/user.service';
import { INestApplication } from '@nestjs/common';
import { SurveyModule } from 'src/survey/survey.module';

describe('Cats', () => {
  let app: INestApplication;
  let userService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule,SurveyModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET user`, () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
  });

  afterAll(async () => {
    await app.close();
  });
});