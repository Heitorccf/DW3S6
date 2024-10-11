import { Router } from "express";
import {
  getAllAlunosController,
  getAlunoByIDController,
  insertAlunoController,
  updateAlunoController,
  deleteAlunoController
} from "../controllers/alunoController";
import { verifyToken } from "../controllers/usuarioController";
import { body, param } from "express-validator";

const router = Router();

// Rota para buscar todos os alunos
router.get("/", getAllAlunosController);

// Rota para buscar um aluno por ID
router.get("/:id", param("id").isNumeric().withMessage("ID deve ser numérico"), getAlunoByIDController);

// Rota para inserir um novo aluno (protegida por autenticação JWT)
router.post(
  "/",
  verifyToken,
  [
    body("nome").notEmpty().withMessage("Nome é obrigatório"),
    body("endereco").notEmpty().withMessage("Endereço é obrigatório"),
    body("cursoid").isNumeric().withMessage("ID do curso deve ser numérico")
  ],
  insertAlunoController
);

// Rota para atualizar um aluno (protegida por autenticação JWT)
router.put(
  "/:id",
  verifyToken,
  [
    param("id").isNumeric().withMessage("ID deve ser numérico"),
    body("nome").notEmpty().withMessage("Nome é obrigatório"),
    body("endereco").notEmpty().withMessage("Endereço é obrigatório"),
    body("cursoid").isNumeric().withMessage("ID do curso deve ser numérico")
  ],
  updateAlunoController
);

// Rota para deletar um aluno (protegida por autenticação JWT)
router.delete("/:id", verifyToken, param("id").isNumeric().withMessage("ID deve ser numérico"), deleteAlunoController);

export default router;
