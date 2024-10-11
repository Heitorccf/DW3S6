import pool from "../database/database";

// Função para buscar um usuário pelo nome de usuário
export const getUserByUsername = async (username: string) => {
  const result = await pool.query("SELECT * FROM usuarios WHERE username = $1 AND deleted = false", [username]);
  return result.rows[0];
};

// Função para inserir um novo usuário
export const insertUser = async (username: string, password: string) => {
  const result = await pool.query(
    "INSERT INTO usuarios (username, password) VALUES ($1, $2) RETURNING *",
    [username, password]
  );
  return result.rows[0];
};

// Função para verificar se o nome de usuário já existe
export const userExists = async (username: string) => {
  const result = await pool.query("SELECT * FROM usuarios WHERE username = $1 AND deleted = false", [username]);
  return result.rowCount > 0;
};
