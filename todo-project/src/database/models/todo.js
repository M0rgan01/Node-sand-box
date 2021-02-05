import Sequelize from 'sequelize';
import db from '../sequelize.js';

const Todo = db.define('todo', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  complete: {
    type: Sequelize.BOOLEAN,
  }
});

Todo.sync().then(() => {
  console.log('Table Todo created');
});

export default Todo;