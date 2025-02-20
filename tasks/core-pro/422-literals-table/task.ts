import type { Entities } from './table-models.ts';

type Get<Model, TableName extends Entities> = {
  [Prop in `get${Capitalize<TableName>}`]: (id: number) => Model;
};

type Update<Model, TableName extends Entities> = {
  [Prop in `update${Capitalize<TableName>}`]: (id: number, update: Partial<Model>) => void;
};

type Delete<Model, TableName extends Entities> = {
  [Prop in `delete${Capitalize<TableName>}`]: (id: number) => Model;
};

  export type Table<T> = {
    getUser(id: number): T;
    deleteProduct(id: number): T;
    updateOrder(id: number, update: Partial<T>): T;
  };