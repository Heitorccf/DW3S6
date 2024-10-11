import { Request, Response } from "express";
import { getUserByUsername, insertUser } from "../models/usuarioModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

// Controlador para realizar o login de usuários
export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
      expiresIn: "1h"
    });

    res.status(200).json({ auth: true, token });
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" });
  }
};

// Controlador para registrar um novo usuário
export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Criptografar a senha
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Inserir o novo usuário no banco de dados
    const newUser = await insertUser(username, hashedPassword);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};
