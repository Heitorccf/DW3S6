import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import { json, urlencoded } from "express";
import errorHandler from "./middleware/errorHandler";
import alunoRoutes from "./routes/alunoRoutes";
import cursoRoutes from "./routes/cursoRoutes";
import authRoutes from "./routes/authRoutes";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Criar a aplicação Express
const app = express();

// Middleware de segurança
app.use(helmet());

// Habilitar CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware para parsear JSON e dados de formulários
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());

// Definir as rotas
app.use("/api/alunos", alunoRoutes);
app.use("/api/cursos", cursoRoutes);
app.use("/api/auth", authRoutes);

// Rota raiz de teste
app.get("/", (req, res) => {
  res.send("API DW3 - Backend rodando!");
});

// Middleware de tratamento de erros (centralizado)
app.use(errorHandler);

// Configurar a porta e iniciar o servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
