import Todo from './database/models/todo.js';
import fs from 'fs';
import { v4 } from 'uuid';

export async function insertTodos() {
  const datas = await Todo.findAll();

  if (datas.length === 0) {
    const initialState = JSON.parse(fs.readFileSync('../todos.json', 'utf8'));
    initialState.forEach(insertTodos => {
      Todo.create({
        id: v4(),
        title: insertTodos.title,
        complete: insertTodos.complete,
      }).then(value => console.log('Insert todo ' + value.id));
    })
  }

}