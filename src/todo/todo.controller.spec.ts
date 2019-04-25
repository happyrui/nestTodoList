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

  it('should return an array of cats', async () => {
    // jest.spyOn(catsService, 'root').mockImplementation(() => 'aaa');
    const data = await catsController.getTodo;
    console.log(data);  

    expect(data).toBeDefined;
  });
});