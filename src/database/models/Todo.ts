import {Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional} from '@sequelize/core';
import sequelize from '../sequelize';
import logger from "../../config/logger";

class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>>  {
  declare id: CreationOptional<string>;
  declare title: string;
  declare complete: boolean;
}

Todo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'Todos',
    sequelize,
  }
);

Todo.sync().then(() => {
  logger.info('Table Todo created');
});

export default Todo;
