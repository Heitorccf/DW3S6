import { Router } from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/usuarioController";

const router = Router();

// Rota para login de usuários
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Nome de usuário é obrigatório"),
    body("password").notEmpty().withMessage("Senha é obrigatória")
  ],
  login
);

// Rota para registrar um novo usuário
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Nome de usuário é obrigatório"),
    body("password").isLength({ min: 6 }).withMessage("A senha deve ter no mínimo 6 caracteres")
  ],
  register
);

export default router;
