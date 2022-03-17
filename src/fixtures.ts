import Todo from './database/models/Todo';
import { randomUUID } from "crypto";

export async function insertTodos() {
  const datas = await Todo.findAll();

  if (datas.length === 0) {
    const todo = Todo.build({ id: randomUUID(), title: 'test', complete: true });
    console.log(todo);
  }
}
