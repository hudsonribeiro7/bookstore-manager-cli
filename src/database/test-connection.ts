import { pool } from "./connection";

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log("Conexão com PostgreSQL realizada com sucesso!");
    console.log("Data/hora do banco:", result.rows[0]);

  } catch (error) {
    console.error("Erro ao conectar com o PostgreSQL:", error);

  } finally {
    await pool.end();
  }
}

testConnection();