import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  Query,
} from '@nestjs/common';

interface Todo {
  id: number;
  text: string;
  active: boolean;
  done: boolean;
}

let todos: Todo[] = [
  'Заметка 1',
  'Заметка 2',
  'Заметка 3',
  'Заметка 4',
  'Заметка 5',
  'Заметка 6',
  'Заметка 7',
].map((text, index) => ({
  id: index + 1,
  text: text,
  active: true,
  done: false,
}));

@Controller('todos')
export class TodosController {
  constructor() {}

  @Get()
  async index(@Query('active') active: string): Promise<Todo[]> {
    if (active === 'true') {
      return todos.filter(({ active, done }) => active && !done);
    } else {
      return todos.filter(({ active }) => active);
    }
  }

  @Get('clear')
  async clear(): Promise<Todo[]> {
    todos = todos.map((todo) => ({ ...todo, active: false }));
    return todos;
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Todo> {
    return todos.find((todo) => todo.id === parseInt(id));
  }

  @Post()
  async create(@Body() { text }: { text: string }): Promise<Todo> {
    const todo = {
      id: todos.length + 1,
      text,
      active: true,
      done: false,
    };
    todos.push(todo);
    return todo;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Todo): Promise<Todo> {
    todos = todos.map((todo) =>
      todo.id === parseInt(id) ? { ...todo, ...data } : todo,
    );

    return data;
  }

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<number> {
    todos = todos.map((todo) =>
      todo.id === parseInt(id) ? { ...todo, active: false } : todo,
    );
    return parseInt(id);
  }
}
