import { Router } from "express";
import {
  getAllCursosController,
  getCursoByIDController,
  insertCursoController,
  updateCursoController,
  deleteCursoController
} from "../controllers/cursoController";
import { verifyToken } from "../controllers/usuarioController";
import { body, param } from "express-validator";

const router = Router();

// Rota para buscar todos os cursos
router.get("/", getAllCursosController);

// Rota para buscar um curso por ID
router.get("/:id", param("id").isNumeric().withMessage("ID deve ser numérico"), getCursoByIDController);

// Rota para inserir um novo curso (protegida por autenticação JWT)
router.post(
  "/",
  verifyToken,
  [
    body("codigo").notEmpty().withMessage("Código do curso é obrigatório"),
    body("descricao").notEmpty().withMessage("Descrição do curso é obrigatória"),
    body("ativo").isBoolean().withMessage("Ativo deve ser um valor booleano")
  ],
  insertCursoController
);

// Rota para atualizar um curso (protegida por autenticação JWT)
router.put(
  "/:id",
  verifyToken,
  [
    param("id").isNumeric().withMessage("ID deve ser numérico"),
    body("codigo").notEmpty().withMessage("Código do curso é obrigatório"),
    body("descricao").notEmpty().withMessage("Descrição do curso é obrigatória"),
    body("ativo").isBoolean().withMessage("Ativo deve ser um valor booleano")
  ],
  updateCursoController
);

// Rota para deletar um curso (protegida por autenticação JWT)
router.delete("/:id", verifyToken, param("id").isNumeric().withMessage("ID deve ser numérico"), deleteCursoController);

export default router;
