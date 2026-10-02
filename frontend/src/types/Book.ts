// Formato de um livro como a API Fastify (GET /books) devolve.
export type Book = {
  id: string;
  title: string;
  authors: string[];
  year: number;
  genre: string;
  pages: number;
  copies: number;
  available: number;
  subjects: string[];
  synopsis: string;
};

