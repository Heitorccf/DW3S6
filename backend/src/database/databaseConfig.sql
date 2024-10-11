-- Cria tabela de cursos
CREATE TABLE IF NOT EXISTS cursos (
  cursoid SERIAL PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE NOT NULL,
  descricao VARCHAR(60) NOT NULL,
  ativo BOOLEAN DEFAULT true,
  deleted BOOLEAN DEFAULT false
);

-- Cria tabela de alunos
CREATE TABLE IF NOT EXISTS alunos (
  alunoid SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  endereco VARCHAR(60),
  cursoid INT REFERENCES cursos(cursoid),
  deleted BOOLEAN DEFAULT false
);

-- Cria tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  usuarioid SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  deleted BOOLEAN DEFAULT false
);

-- Inserir um usuário inicial (para testes)
INSERT INTO usuarios (username, password) VALUES 
('admin', crypt('admin123', gen_salt('bf')));