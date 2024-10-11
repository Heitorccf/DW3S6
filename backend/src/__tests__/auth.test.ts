import request from "supertest";
import app from "../app";

describe("Testes do módulo de Autenticação", () => {
  it("Deve registrar um novo usuário", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "usuarioTeste",
        password: "senha123"
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("username", "usuarioTeste");
  });

  it("Deve realizar login de um usuário", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        username: "usuarioTeste",
        password: "senha123"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("Deve retornar erro ao tentar login com senha incorreta", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        username: "usuarioTeste",
        password: "senhaErrada"
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Senha incorreta");
  });
});
