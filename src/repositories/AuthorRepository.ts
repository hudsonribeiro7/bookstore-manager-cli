import { pool } from "../database/connection";
import { Author } from "../models/Author";

export class AuthorRepository {
  async create(name: string): Promise<Author> {
    const result = await pool.query(
      "INSERT INTO authors (name) VALUES ($1) RETURNING id, name",
      [name]
    );

    return result.rows[0];
  }

  async findAll(): Promise<Author[]> {
    const result = await pool.query(
      "SELECT id, name FROM authors ORDER BY name"
    );

    return result.rows;
  }
}