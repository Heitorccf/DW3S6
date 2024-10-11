// Importações necessárias
import express from "express";
import dotenv from "dotenv";

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração inicial do servidor
const app = express();
const port = process.env.PORT || 40000;

// Configurações para o servidor processar JSON
app.use(express.json());

// Rota inicial para testar o servidor
app.get("/", (req, res) => {
  res.send("Servidor backend rodando...");
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});