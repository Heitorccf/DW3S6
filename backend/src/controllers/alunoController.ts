import { Request, Response } from "express";
import { getAllAlunos, getAlunoByID, insertAluno, updateAluno, deleteAluno } from "../models/alunoModel";
import { validationResult } from "express-validator";

// Controlador para buscar todos os alunos
export const getAllAlunosController = async (req: Request, res: Response) => {
  try {
    const alunos = await getAllAlunos();
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
};

// Controlador para buscar um aluno por ID
export const getAlunoByIDController = async (req: Request, res: Response) => {
  try {
    const aluno = await getAlunoByID(Number(req.params.id));
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }
    res.status(200).json(aluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar aluno" });
  }
};

// Controlador para inserir um novo aluno
export const insertAlunoController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nome, endereco, cursoid } = req.body;
    const novoAluno = await insertAluno(nome, endereco, cursoid);
    res.status(201).json(novoAluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao inserir aluno" });
  }
};

// Controlador para atualizar um aluno
export const updateAlunoController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nome, endereco, cursoid } = req.body;
    const alunoAtualizado = await updateAluno(Number(req.params.id), nome, endereco, cursoid);
    if (!alunoAtualizado) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }
    res.status(200).json(alunoAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar aluno" });
  }
};

// Controlador para deletar um aluno
export const deleteAlunoController = async (req: Request, res: Response) => {
  try {
    const alunoDeletado = await deleteAluno(Number(req.params.id));
    if (!alunoDeletado) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }
    res.status(200).json(alunoDeletado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar aluno" });
  }
};
