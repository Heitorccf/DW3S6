import { Router } from "express";
import {
  getAllAlunosController,
  getAlunoByIDController,
  insertAlunoController,
  updateAlunoController,
  deleteAlunoController,
} from "../controllers/alunoController";

const router = Router();

// Rota para buscar todos os alunos
router.get("/alunos", getAllAlunosController);

// Rota para buscar um aluno por ID
router.get("/alunos/:id", getAlunoByIDController);

// Rota para inserir um novo aluno
router.post("/alunos", insertAlunoController);

// Rota para atualizar um aluno
router.put("/alunos/:id", updateAlunoController);

// Rota para deletar um aluno
router.delete("/alunos/:id", deleteAlunoController);

export default router;