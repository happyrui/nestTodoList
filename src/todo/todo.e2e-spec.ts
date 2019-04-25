import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TodoModule } from './todo.module';
import { TodoService } from './todo.service';
import { INestApplication } from '@nestjs/common';

describe('Cats', () => {
  let app: INestApplication;
  let todoService = { getTodo: () => ['aaa'] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TodoModule],
    })
      .overrideProvider(TodoService)
      .useValue(todoService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET todo`, () => {
    return request(app.getHttpServer())
      .get('/todo')
      .expect(200)
      .expect(
        todoService.getTodo()
      );
  });

  afterAll(async () => {
    await app.close();
  });
});