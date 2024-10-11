-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  usuarioid SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  deleted BOOLEAN DEFAULT false
);

-- Criação da tabela de cursos
CREATE TABLE IF NOT EXISTS cursos (
  cursoid SERIAL PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  ativo BOOLEAN DEFAULT true,
  deleted BOOLEAN DEFAULT false
);

-- Criação da tabela de alunos
CREATE TABLE IF NOT EXISTS alunos (
  alunoid SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  endereco VARCHAR(100) NOT NULL,
  cursoid INT REFERENCES cursos(cursoid),
  deleted BOOLEAN DEFAULT false
);
