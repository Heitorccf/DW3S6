import pool from "../database/database";

// Função para buscar todos os cursos
export const getAllCursos = async () => {
  const result = await pool.query("SELECT * FROM cursos WHERE deleted = false");
  return result.rows;
};

// Função para buscar um curso pelo ID
export const getCursoByID = async (id: number) => {
  const result = await pool.query("SELECT * FROM cursos WHERE cursoid = $1 AND deleted = false", [id]);
  return result.rows[0];
};

// Função para inserir um novo curso
export const insertCurso = async (codigo: string, descricao: string, ativo: boolean) => {
  const result = await pool.query(
    "INSERT INTO cursos (codigo, descricao, ativo) VALUES ($1, $2, $3) RETURNING *",
    [codigo, descricao, ativo]
  );
  return result.rows[0];
};

// Função para atualizar um curso
export const updateCurso = async (id: number, codigo: string, descricao: string, ativo: boolean) => {
  const result = await pool.query(
    "UPDATE cursos SET codigo = $1, descricao = $2, ativo = $3 WHERE cursoid = $4 AND deleted = false RETURNING *",
    [codigo, descricao, ativo, id]
  );
  return result.rows[0];
};

// Função para deletar um curso
export const deleteCurso = async (id: number) => {
  const result = await pool.query(
    "UPDATE cursos SET deleted = true WHERE cursoid = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};