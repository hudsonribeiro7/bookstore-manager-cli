import { pool } from "../database/connection";
import { Loan } from "../models/Loan";

export class LoanRepository {
  async create(bookId: number, clientId: number): Promise<Loan> {
    const book = await pool.query(
      "SELECT id, available FROM books WHERE id = $1",
      [bookId]
    );

    if (book.rows.length === 0) {
      throw new Error("Livro não encontrado.");
    }

    if (!book.rows[0].available) {
      throw new Error("Livro não está disponível.");
    }

    const client = await pool.query(
      "SELECT id FROM clients WHERE id = $1",
      [clientId]
    );

    if (client.rows.length === 0) {
      throw new Error("Cliente não encontrado.");
    }

    const result = await pool.query(
      `INSERT INTO loans (book_id, client_id)
       VALUES ($1, $2)
       RETURNING id,
                 book_id AS "bookId",
                 client_id AS "clientId",
                 loan_date AS "loanDate",
                 return_date AS "returnDate"`,
      [bookId, clientId]
    );

    await pool.query(
      "UPDATE books SET available = FALSE WHERE id = $1",
      [bookId]
    );

    return result.rows[0];
  }

  async findAll(): Promise<Loan[]> {
    const result = await pool.query(
      `SELECT
         l.id,
         l.book_id AS "bookId",
         l.client_id AS "clientId",
         l.loan_date AS "loanDate",
         l.return_date AS "returnDate",
         b.title AS "bookTitle",
         c.name AS "clientName"
       FROM loans l
       INNER JOIN books b ON b.id = l.book_id
       INNER JOIN clients c ON c.id = l.client_id
       ORDER BY l.loan_date DESC`
    );

    return result.rows;
  }
}