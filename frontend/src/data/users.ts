import type { User } from "../types/User";

// Login mockado: estes são os únicos alunos que conseguem entrar.
// Continua mockado na N1 (sem autenticação real), como pede o enunciado.
export const users: User[] = [
  {
    id: 1,
    name: "Diogo",
    email: "diogo@campus.edu",
    password: "123456",
    course: "Sistemas de Informação",
  },
  {
    id: 2,
    name: "Ana",
    email: "ana@campus.edu",
    password: "biblioteca",
    course: "Engenharia de Software",
  },
];
