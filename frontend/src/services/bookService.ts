import type { Book } from "../types/Book";

// Endereço da NOSSA API (Fastify), que roda separada do React.
const API_URL = "http://localhost:3000";

// Mensagem usada quando a API nem responde (servidor desligado, rede caída).
// Nesse caso o fetch lança um erro e cai no catch.
const ERRO_CONEXAO =
  "Não foi possível falar com a API. Verifique se o servidor Fastify está rodando (porta 3000).";

// GET /health -> confirma se a API está no ar
export async function getHealth(): Promise<{ status: string }> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/health`);
  } catch {
    throw new Error(ERRO_CONEXAO);
  }

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  return response.json();
}

// GET /books -> lista de livros do acervo
export async function getBooks(): Promise<Book[]> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/books`);
  } catch {
    // Erro de rede: nem chegou a receber resposta HTTP
    throw new Error(ERRO_CONEXAO);
  }

  // A API respondeu, mas com status de erro (404, 500...).
  // O fetch NÃO cai no catch sozinho nesse caso, por isso o response.ok.
  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  return response.json();
}

// GET /books/:id -> um livro específico
export async function getBookById(id: string): Promise<Book> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/books/${id}`);
  } catch {
    throw new Error(ERRO_CONEXAO);
  }

  if (response.status === 404) {
    throw new Error("Livro não encontrado no acervo.");
  }

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  return response.json();
}
