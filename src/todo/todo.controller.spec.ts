import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoEntity } from './entity/todo.entity';
import { TodoModule } from './todo.module';
import { CreateTodoDto } from './dto/create-todo.dto';
import { IdDto } from './dto/get-todo-id.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        {
          provide: TodoEntity, // Replace TodoEntity with the actual entity class
          useValue: {}, // Provide a mock or an instance of the TodoEntity class
        },
        {
          provide: TodoModule, // Replace TodoModel with the actual model class
          useValue: {}, // Provide a mock or an instance of the TodoModel class
        },
      ],
    }).compile();

    todoService = moduleRef.get<TodoService>(TodoService);
    todoController = moduleRef.get<TodoController>(TodoController);
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const result: any = [];
      jest.spyOn(todoService, 'findAll').mockImplementation(() => result);
      expect(await todoController.findAll()).toBe(result);
    });
  });

  const mockService = {
    create: jest.fn((dto) => ({ ...dto })),
  };

  describe('create', () => {
    it('should create a todo', async () => {
      const createDto: CreateTodoDto = {
        title: 'Example Todo',
        description: 'This is an example todo',
        status: false,
      };

      const expectedResult: any = mockService.create(createDto);
      jest.spyOn(todoService, 'create').mockResolvedValue(expectedResult);
      const result = await todoController.create(createDto);
      expect(result).toEqual(expectedResult);
      expect(todoService.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('find todo by id', () => {
    it('should find todo by id', async () => {
      const idDto: IdDto = { id: '64ad733aa0ebeca7a15cab2d' };
      const find = {
        _id: '64ad733aa0ebeca7a15cab2d',
        name: 'Pococare',
        description: 'health tech startup here',
        status: false,
        createdAt: '2023-07-11T15:20:26.474Z',
        updatedAt: '2023-07-11T15:20:26.474Z',
        __v: 0,
      };
      const expectedResult: any = mockService.create(find);
      jest.spyOn(todoService, 'findOne').mockResolvedValue(expectedResult);

      const result = await todoController.findOne(idDto);
      expect(result).toEqual(expectedResult);
      expect(todoService.findOne).toHaveBeenCalledWith(idDto);
    });
  });

  describe('delete', () => {
    it('should delete a specific todo', async () => {
      const idDto: IdDto = { id: '64ad733aa0ebeca7a15cab2d' };
      const createDto: CreateTodoDto = {
        title: 'Example Todo',
        description: 'This is an example todo',
        status: false,
      };
      const expectedResult: any = mockService.create(createDto);
      jest.spyOn(todoService, 'delete').mockResolvedValue(expectedResult);
      const result = await todoController.delete(idDto);
      expect(result).toBe(expectedResult);
      expect(todoService.delete).toHaveBeenCalledWith(idDto);
    });
  });

  describe('update', () => {
    it('should update a specific todo', async () => {
      const idDto: IdDto = { id: '64ad733aa0ebeca7a15cab2d' };
      const updateTodoDto: UpdateTodoDto = {
        title: 'change to poco',
        description: 'This is an example todo',
        status: false,
      };
      const updatedTodo = {
        _id: '64ad733aa0ebeca7a15cab2d',
        title: 'change to poco',
        description: 'This is an example todo',
        status: false,
      };
      const expectedResult: any = updatedTodo;

      jest.spyOn(todoService, 'update').mockResolvedValue(expectedResult);

      const result = await todoController.update(idDto, updateTodoDto);
      expect(result).toEqual(expectedResult);
      expect(todoService.update).toHaveBeenCalledWith(idDto, updateTodoDto);
    });
  });
});















































































































































// FOR HANDLING DELETE Error
// it('handle the error if todo is not found with id', async () => {
//   const idDto: IdDto = { id: '64ad471a866ed6b50c156b58' };
//   const expectedOutput = {
//     message: 'Todo not found',
//   };

//   jest.spyOn(todoService, 'delete').mockResolvedValue(expectedOutput);

//   const result = await todoController.delete(idDto); // Pass the entire IdDto object
//   expect(result).toEqual(expectedOutput);
// });

// describe('create', () => {
//   it('should create a new todo', async () => {
//    const expectedRes : any = mockService.create;
//     jest
//       .spyOn(todoService, 'create')
//       .mockResolvedValue(expectedRes);
//   });
// });

// describe('findOne', () => {
//   it('should find and return a specific todo if it exists', async () => {
//     const idDto: any = '64ad733aa0ebeca7a15cab2d';
//     const foundTodo = {
//       _id: '64ad733aa0ebeca7a15cab2d',
//       name: 'Pococare',
//       description: 'health tech startup here',
//       status: false,
//       createdAt: '2023-07-11T15:20:26.474Z',
//       updatedAt: '2023-07-11T15:20:26.474Z',
//       __v: 0,
//     };

//     jest
//       .spyOn(todoService, 'findOne')
//       .mockResolvedValue(async () => foundTodo);
//     expect(await todoController.findOne(idDto)).toBe(foundTodo);
//     expect(todoService.findOne).toHaveBeenCalledWith(idDto);
//   });
// });

//   describe('create',()=>{
//     it('shoult created a todo',()=>{
//       const expectedResult: any = mockService.create;
//       jest.spyOn(todoService, 'create').mockResolvedValue(expectedResult);
//     })
//   });

// describe('Todo Controller Unit testing', () => {
//   let todoController: TodoController;
//   let spyService: TodoService;

//   beforeAll(async () => {
//     const ApiServiceProvider = {
//       provide: TodoService,
//       useFactory: () => ({
//         findAll: jest.fn(() => []),
//         findeOne: jest.fn(() => {}),
//       }),
//     };
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [TodoController],
//       providers: [TodoService, ApiServiceProvider],
//     }).compile();
//     todoController = app.get<TodoController>(TodoController);
//     spyService = app.get<TodoService>(TodoService);
//   });
//   it('calling create methods', () => {
//     const dto = new CreateTodoDto();
//     expect(spyService.create(dto)).not.toEqual(null);
//   });
//   it('calling findAll todo method', () => {
//     todoController.findAll();
//     expect(spyService.findAll).toHaveBeenCalled();
//   });

//   it('callging findOne by id method', () => {
//     const dto = {
//       id: '64ad733aa0ebeca7a15cab2d',
//       name: 'Pococare',
//       description: 'health tech startup here',
//       status: false,
//       createdAt: '2023-07-11T15:20:26.474Z',
//       updatedAt: '2023-07-11T15:20:26.474Z',
//       __v: 0,
//     };
//     todoController.findOne(dto);
//     expect(spyService.findOne).toHaveBeenCalled();
//   });
// });
