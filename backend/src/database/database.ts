import { Pool } from "pg";
import dotenv from "dotenv";

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Criar um pool de conexões com o PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "dw3",
  password: process.env.DB_PASS || "password123",
  port: Number(process.env.DB_PORT) || 5432,
});

pool.on("connect", () => {
  console.log("Conectado ao banco de dados PostgreSQL");
});

// Tratamento de erros na conexão com o banco de dados
pool.on("error", (err: Error) => {
  console.error("Erro no banco de dados:", err.message);
});

export default pool;
