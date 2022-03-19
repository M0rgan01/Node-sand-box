import Todo from './database/models/Todo';
import { randomUUID } from 'crypto';

export async function insertTodos() {
  const todos = await Todo.findAll();

  if (todos.length === 0) {
    for (let i = 0; i < 5; i++) {
      await Todo.create({
        id: randomUUID(),
        title: `test${i}`,
        complete: Math.random() >= 0.5,
      });
    }
  }
}
