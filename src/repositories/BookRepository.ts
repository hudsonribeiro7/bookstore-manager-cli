import { pool } from "../database/connection";
import { Book } from "../models/Book";

export class BookRepository {
  async create(title: string, authorId: number): Promise<Book> {
    const author = await pool.query(
      "SELECT id FROM authors WHERE id = $1",
      [authorId]
    );

    if (author.rows.length === 0) {
      throw new Error("Autor não encontrado.");
    }

    const result = await pool.query(
      `INSERT INTO books (title, author_id)
       VALUES ($1, $2)
       RETURNING id, title, author_id AS "authorId", available`,
      [title, authorId]
    );

    return result.rows[0];
  }

  async findAll(): Promise<Book[]> {
    const result = await pool.query(
      `SELECT
         b.id,
         b.title,
         b.author_id AS "authorId",
         b.available,
         a.name AS "authorName"
       FROM books b
       INNER JOIN authors a ON a.id = b.author_id
       ORDER BY b.title`
    );

    return result.rows;
  }
}