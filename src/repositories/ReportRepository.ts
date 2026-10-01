import { pool } from "../database/connection";

export class ReportRepository {
  async availableBooks() {
    const result = await pool.query(
      `SELECT
         b.id,
         b.title,
         a.name AS "authorName"
       FROM books b
       INNER JOIN authors a ON a.id = b.author_id
       WHERE b.available = TRUE
       ORDER BY b.title`
    );

    return result.rows;
  }

  async borrowedBooks() {
    const result = await pool.query(
      `SELECT
         b.title AS "bookTitle",
         c.name AS "clientName",
         l.loan_date AS "loanDate"
       FROM loans l
       INNER JOIN books b ON b.id = l.book_id
       INNER JOIN clients c ON c.id = l.client_id
       WHERE l.return_date IS NULL
       ORDER BY l.loan_date DESC`
    );

    return result.rows;
  }

  async booksByAuthor() {
    const result = await pool.query(
      `SELECT
         a.name AS "authorName",
         COUNT(b.id) AS "totalBooks"
       FROM authors a
       LEFT JOIN books b ON b.author_id = a.id
       GROUP BY a.id, a.name
       ORDER BY "totalBooks" DESC
       LIMIT 10`
    );

    return result.rows;
  }

  async loanCountByBook() {
    const result = await pool.query(
      `SELECT
         b.title AS "bookTitle",
         COUNT(l.id) AS "totalLoans"
       FROM books b
       LEFT JOIN loans l ON l.book_id = b.id
       GROUP BY b.id, b.title
       ORDER BY "totalLoans" DESC
       LIMIT 10`
    );

    return result.rows;
  }

  async clientsWithActiveLoans() {
    const result = await pool.query(
      `SELECT
         c.name AS "clientName",
         COUNT(l.id) AS "activeLoans"
       FROM clients c
       LEFT JOIN loans l
         ON l.client_id = c.id
         AND l.return_date IS NULL
       GROUP BY c.id, c.name
       HAVING COUNT(l.id) > 0
       ORDER BY "activeLoans" DESC`
    );

    return result.rows;
  }
}