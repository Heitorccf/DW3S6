import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware de verificação de token JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Verifica o cabeçalho Authorization
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ auth: false, message: "Token não fornecido" });
  }

  // Verifica a validade do token
  jwt.verify(token, process.env.SECRET_API || "secret", (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: "Falha ao autenticar o token" });
    }

    // Adiciona o ID do usuário decodificado à requisição
    req.body.userId = decoded?.userId;
    next();
  });
};
