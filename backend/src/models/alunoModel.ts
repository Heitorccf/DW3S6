import pool from "../database/database";

// Função para buscar todos os alunos
export const getAllAlunos = async () => {
  const result = await pool.query("SELECT * FROM alunos WHERE deleted = false");
  return result.rows;
};

// Função para buscar um aluno pelo ID
export const getAlunoByID = async (id: number) => {
  const result = await pool.query("SELECT * FROM alunos WHERE alunoid = $1 AND deleted = false", [id]);
  return result.rows[0];
};

// Função para inserir um novo aluno
export const insertAluno = async (nome: string, endereco: string, cursoid: number) => {
  const result = await pool.query(
    "INSERT INTO alunos (nome, endereco, cursoid) VALUES ($1, $2, $3) RETURNING *",
    [nome, endereco, cursoid]
  );
  return result.rows[0];
};

// Função para atualizar um aluno
export const updateAluno = async (id: number, nome: string, endereco: string, cursoid: number) => {
  const result = await pool.query(
    "UPDATE alunos SET nome = $1, endereco = $2, cursoid = $3 WHERE alunoid = $4 AND deleted = false RETURNING *",
    [nome, endereco, cursoid, id]
  );
  return result.rows[0];
};

// Função para deletar um aluno
export const deleteAluno = async (id: number) => {
  const result = await pool.query(
    "UPDATE alunos SET deleted = true WHERE alunoid = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};