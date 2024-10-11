import { Router } from "express";
import {
  getAllCursosController,
  getCursoByIDController,
  insertCursoController,
  updateCursoController,
  deleteCursoController,
} from "../controllers/cursoController";

const router = Router();

// Rota para buscar todos os cursos
router.get("/cursos", getAllCursosController);

// Rota para buscar um curso por ID
router.get("/cursos/:id", getCursoByIDController);

// Rota para inserir um novo curso
router.post("/cursos", insertCursoController);

// Rota para atualizar um curso
router.put("/cursos/:id", updateCursoController);

// Rota para deletar um curso
router.delete("/cursos/:id", deleteCursoController);

export default router;