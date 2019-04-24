import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('Todo Controller', () => {
  let catsController: TodoController;
  let catsService: TodoService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    catsService = module.get<TodoService>(TodoService);
    catsController = module.get<TodoController>(TodoController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      // jest.spyOn(catsService, 'root').mockImplementation(() => 'aaa');

      expect(catsController.getTodo()).toBeDefined;
    });
  });
});