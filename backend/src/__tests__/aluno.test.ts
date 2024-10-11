import request from "supertest";
import app from "../app";

describe("Testes do módulo de Alunos", () => {
  it("Deve buscar todos os alunos", async () => {
    const res = await request(app).get("/api/alunos");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("Deve buscar um aluno por ID", async () => {
    const res = await request(app).get("/api/alunos/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("nome");
  });

  it("Deve criar um novo aluno", async () => {
    const res = await request(app)
      .post("/api/alunos")
      .send({
        nome: "Teste Aluno",
        endereco: "Rua Teste",
        cursoid: 1
      })
      .set("Authorization", "Bearer <token-válido>");
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("nome", "Teste Aluno");
  });

  it("Deve atualizar um aluno", async () => {
    const res = await request(app)
      .put("/api/alunos/1")
      .send({
        nome: "Aluno Atualizado",
        endereco: "Rua Nova",
        cursoid: 1
      })
      .set("Authorization", "Bearer <token-válido>");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("nome", "Aluno Atualizado");
  });

  it("Deve deletar um aluno", async () => {
    const res = await request(app)
      .delete("/api/alunos/1")
      .set("Authorization", "Bearer <token-válido>");
    expect(res.statusCode).toEqual(200);
  });
});
