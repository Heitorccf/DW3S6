import { Request, Response } from "express";
import { getAllCursos, getCursoByID, insertCurso, updateCurso, deleteCurso } from "../models/cursoModel";

// Controlador para buscar todos os cursos
export const getAllCursosController = async (req: Request, res: Response) => {
  try {
    const cursos = await getAllCursos();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cursos" });
  }
};

// Controlador para buscar curso por ID
export const getCursoByIDController = async (req: Request, res: Response) => {
  try {
    const curso = await getCursoByID(Number(req.params.id));
    if (curso) {
      res.status(200).json(curso);
    } else {
      res.status(404).json({ error: "Curso não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar curso" });
  }
};

// Controlador para inserir um novo curso
export const insertCursoController = async (req: Request, res: Response) => {
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
  try {
    const { codigo, descricao, ativo } = req.body;
    const cursoAtualizado = await updateCurso(Number(req.params.id), codigo, descricao, ativo);
    if (cursoAtualizado) {
      res.status(200).json(cursoAtualizado);
    } else {
      res.status(404).json({ error: "Curso não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar curso" });
  }
};

// Controlador para deletar um curso
export const deleteCursoController = async (req: Request, res: Response) => {
  try {
    const cursoDeletado = await deleteCurso(Number(req.params.id));
    if (cursoDeletado) {
      res.status(200).json(cursoDeletado);
    } else {
      res.status(404).json({ error: "Curso não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar curso" });
  }
};