import { Request, Response } from "express";
import { getUserByUsername, insertUser } from "../models/usuarioModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Função para realizar o login e gerar o JWT
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Buscar o usuário no banco de dados
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verificar se a senha está correta
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    // Gerar o token JWT
    const token = jwt.sign({ userId: user.usuarioid }, process.env.SECRET_API || "secret", {
      expiresIn: "1h", // Token válido por 1 hora
    });

    return res.status(200).json({ auth: true, token });
  } catch (error) {
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

// Função para registrar um novo usuário (apenas para testes)
export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Criptografar a senha
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Inserir o novo usuário no banco de dados
    const newUser = await insertUser(username, hashedPassword);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

// Função para verificar se o token JWT é válido
export const verifyToken = (req: Request, res: Response, next: Function) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ auth: false, message: "Nenhum token fornecido." });
  }

  jwt.verify(token, process.env.SECRET_API || "secret", (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: "Falha ao autenticar o token." });
    }

    req.body.userId = decoded?.userId;
    next();
  });
};