import { DataAccess } from './DataAccess.ts';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
}

// Generic repository class for all entity types
export class Repository<T extends { id?: number }> {
  protected dataAccess: DataAccess;
  protected tableName: string;

  constructor(dataAccess: DataAccess, tableName: string) {
    this.dataAccess = dataAccess;
    this.tableName = tableName;
  }

  async getById(id: number): Promise<T | undefined> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const values = [id];
    const res = await this.dataAccess.query<T>(query, values);
    return res.rows[0];
  }

  async getAll(): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName}`;
    const res = await this.dataAccess.query<T>(query);
    return res.rows;
  }

  async insert(entity: Omit<T, 'id'>): Promise<T> {
    const keys = Object.keys(entity);
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
    const columns = keys.join(', ');
    const values = Object.values(entity);

    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
    const res = await this.dataAccess.query<T>(query, values);
    return res.rows[0];
  }
}

// User-specific repository extending the generic repository
export class UserRepository extends Repository<User> {
  constructor(dataAccess: DataAccess) {
    super(dataAccess, 'users');
  }
}

// Product-specific repository extending the generic repository
export class ProductRepository extends Repository<Product> {
  constructor(dataAccess: DataAccess) {
    super(dataAccess, 'products');
  }
}
