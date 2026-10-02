// =============================================================
// Estante do Campus - API inicial (N1)
// Servidor Fastify que roda SEPARADO do frontend React.
// Objetivo desta etapa: provar a comunicação React -> HTTP -> Fastify.
// Sem banco de dados ainda: os livros ficam em memória (src/data/books.ts).
// =============================================================

import Fastify from "fastify";
import cors from "@fastify/cors";
import { books } from "./data/books";

// logger: true faz o Fastify mostrar cada requisição no terminal,
// com método, rota, status e responseTime (tempo em ms).
const app = Fastify({
  logger: true,
});

async function start() {
  // -----------------------------------------------------------
  // CORS
  // O React roda em http://localhost:5173 e a API em http://localhost:3000.
  // Portas diferentes = origens diferentes, então o navegador bloqueia
  // a resposta se o servidor não liberar essa origem explicitamente.
  // -----------------------------------------------------------
  await app.register(cors, {
    origin: "http://localhost:5173",
  });

  // GET / -> rota raiz, só confirma que a API responde
  app.get("/", async () => {
    return { message: "API da Estante do Campus funcionando!" };
  });

  // GET /health -> "sinal de vida" da API.
  // O Painel do React chama esta rota para mostrar se a API está no ar.
  app.get("/health", async () => {
    return { status: "ok" };
  });

  // GET /books -> lista todos os livros do acervo (dados em memória).
  // É o endpoint do domínio, consumido pelo Catálogo e pelo Painel.
  app.get("/books", async () => {
    return books;
  });

  // GET /books/:id -> um livro específico (página de detalhes).
  // :id é um parâmetro de rota, lido em request.params.
  app.get("/books/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const book = books.find((book) => book.id === id);

    if (!book) {
      return reply.status(404).send({ message: "Livro não encontrado" });
    }

    return book;
  });

  await app.listen({
    port: 3000,
    host: "0.0.0.0",
  });
}

start();
