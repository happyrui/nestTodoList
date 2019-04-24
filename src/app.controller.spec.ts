import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      console.log(app);
      const appController = app.get<AppController>(AppController);
      console.log(appController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
