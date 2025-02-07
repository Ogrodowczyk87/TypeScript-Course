import { DataAccess } from './DataAccess.ts';

export interface User {
  id: number;
  name: string;
  email: string;
}


export class UserRepository {
  private dataAccess: DataAccess;

  constructor(dataAccess: DataAccess) {
    this.dataAccess = dataAccess;
  }

  async getById(id: number) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const res = await this.dataAccess.query<User>(query, values);
    return res.rows[0];
  }

  async getAll() {
    const query = 'SELECT * FROM users';
    const res = await this.dataAccess.query<User>(query);
    return res.rows;
  }

  async insert(user: Omit<User, 'id'>) {
    const { name, email } = user;
    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
    const values = [name, email];
    const res = await this.dataAccess.query<User>(query, values);
    return res.rows[0];
  }
}

export interface Product {
  id?: number;
  name: string;
  price: number;
}

export class ProductRepository {
  private dataAccess: DataAccess;

  constructor(dataAccess: DataAccess) {
    this.dataAccess = dataAccess;
  }

  async getById(id: number) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const values = [id];
    const res = await this.dataAccess.query<Product>(query, values);
    return res.rows[0];
  }

  async getAll() {
    const query = 'SELECT * FROM products';
    const res = await this.dataAccess.query<Product>(query);
    return res.rows;
  }

  async insert(product: Omit<Product, 'id'>) {
    const { name, price } = product;
    const query = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
    const values = [name, price];
    const res = await this.dataAccess.query<Product>(query, values);
    return res.rows[0];
  }
}

export class Repository<T extends { id?: number }> {}
