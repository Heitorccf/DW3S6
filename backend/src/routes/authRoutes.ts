import { Router } from "express";
import { login, register, verifyToken } from "../controllers/usuarioController";

const router = Router();

// Rota para login de usuários
router.post("/login", login);

// Rota para registrar um novo usuário (para testes)
router.post("/register", register);

// Rota protegida para verificar o token
router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({ message: "Token válido!" });
});

export default router;