import { Request, Response, NextFunction } from "express";
import logger from "./logger";

// Middleware de tratamento de erros
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Logar o erro
  logger.error(`${err.message} - ${req.method} ${req.originalUrl} - ${req.ip}`);

  // Definir o status do erro (padrão: 500)
  const statusCode = err.status || 500;

  // Enviar resposta de erro
  res.status(statusCode).json({
    error: {
      message: err.message || "Ocorreu um erro interno no servidor",
      status: statusCode
    }
  });
};

export default errorHandler;
