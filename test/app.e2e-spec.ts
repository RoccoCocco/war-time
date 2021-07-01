import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/wageWar (GET)', () => {
    return request(app.getHttpServer()).get('/wageWar?armyOne=1&armyTwo=1').expect(200);
  });

  it('/wageWar (GET)', () => {
    return request(app.getHttpServer()).get('/wageWarWithHistory?armyOne=1&armyTwo=1').expect(200);
  });

  it.skip('/wageWar (GET) Fail', () => {
    // REVIEW: not validating against model
    return request(app.getHttpServer()).get('/wageWar?armyOne=0&armyTwo=1').expect(400);
  });
});
