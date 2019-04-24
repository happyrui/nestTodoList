import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatService } from './cats.service';

describe('AppController', () => {
  let appController: CatsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatService],
    }).compile();

    appController = app.get<CatsController>(CatsController);
  });

  describe('root', () => {
    it('should return "Hello World!aaaa"', () => {
      expect(appController.getCat()).toBe('Hello World!aaaa');
    });
  });
});
