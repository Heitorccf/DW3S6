import { Request, Response } from "express";
import { getAllCursos, getCursoByID, insertCurso, updateCurso, deleteCurso } from "../models/cursoModel";
import { validationResult } from "express-validator";

// Controlador para buscar todos os cursos
export const getAllCursosController = async (req: Request, res: Response) => {
  try {
    const cursos = await getAllCursos();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cursos" });
  }
};

// Controlador para buscar um curso por ID
export const getCursoByIDController = async (req: Request, res: Response) => {
  try {
    const curso = await getCursoByID(Number(req.params.id));
    if (!curso) {
      return res.status(404).json({ error: "Curso não encontrado" });
    }
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar curso" });
  }
};

// Controlador para inserir um novo curso
export const insertCursoController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { codigo, descricao, ativo } = req.body;
    const novoCurso = await insertCurso(codigo, descricao, ativo);
    res.status(201).json(novoCurso);
  } catch (error) {
    res.status(500).json({ error: "Erro ao inserir curso" });
  }
};

// Controlador para atualizar um curso
export const updateCursoController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { codigo, descricao, ativo } = req.body;
    const cursoAtualizado = await updateCurso(Number(req.params.id), codigo, descricao, ativo);
    if (!cursoAtualizado) {
      return res.status(404).json({ error: "Curso não encontrado" });
    }
    res.status(200).json(cursoAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar curso" });
  }
};

// Controlador para deletar um curso
export const deleteCursoController = async (req: Request, res: Response) => {
  try {
    const cursoDeletado = await deleteCurso(Number(req.params.id));
    if (!cursoDeletado) {
      return res.status(404).json({ error: "Curso não encontrado" });
    }
    res.status(200).json(cursoDeletado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar curso" });
  }
};
