import { pool } from "../database/connection";
import { Client } from "../models/Client";

export class ClientRepository {
  async create(name: string, email: string): Promise<Client> {
    const result = await pool.query(
      `INSERT INTO clients (name, email)
       VALUES ($1, $2)
       RETURNING id, name, email`,
      [name, email]
    );

    return result.rows[0];
  }

  async findAll(): Promise<Client[]> {
    const result = await pool.query(
      `SELECT id, name, email
       FROM clients
       ORDER BY name`
    );

    return result.rows;
  }
}