import request from "supertest";
import app from "../app";

describe("Testes do módulo de Cursos", () => {
  it("Deve buscar todos os cursos", async () => {
    const res = await request(app).get("/api/cursos");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("Deve buscar um curso por ID", async () => {
    const res = await request(app).get("/api/cursos/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("codigo");
  });

  it("Deve criar um novo curso", async () => {
    const res = await request(app)
      .post("/api/cursos")
      .send({
        codigo: "C001",
        descricao: "Curso de Teste",
        ativo: true
      })
      .set("Authorization", "Bearer <token-válido>");
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("codigo", "C001");
  });

  it("Deve atualizar um curso", async () => {
    const res = await request(app)
      .put("/api/cursos/1")
      .send({
        codigo: "C002",
        descricao: "Curso Atualizado",
        ativo: true
      })
      .set("Authorization", "Bearer <token-válido>");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("codigo", "C002");
  });

  it("Deve deletar um curso", async () => {
    const res = await request(app)
      .delete("/api/cursos/1")
      .set("Authorization", "Bearer <token-válido>");
    expect(res.statusCode).toEqual(200);
  });
});
