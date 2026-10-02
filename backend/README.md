# Estante do Campus — API (Fastify)

API inicial do projeto evolutivo (N1), feita como na aula de 25/09:
Node.js + Fastify + TypeScript, executado com `tsx`. Mantém o acervo **em memória**
e serve os dados para o frontend React. Roda separada do frontend.

## Requisitos

- Node.js 20 ou mais novo.

## Instalar e executar

```bash
npm install
npm run dev
```

O servidor sobe em `http://localhost:3000`.

- `npm run dev`: `tsx watch src/server.ts`, reinicia sozinho ao salvar.
- `npm start`: roda sem o modo watch.

## Estrutura

```text
backend/
├── src/
│   ├── server.ts       servidor, CORS e rotas
│   └── data/books.ts   acervo em memória (60 livros) + tipo Book
└── package.json
```

## Endpoints

| Método e rota | O que devolve |
| --- | --- |
| `GET /` | `{ "message": "API da Estante do Campus funcionando!" }` |
| `GET /health` | `{ "status": "ok" }`: confirma que a API está no ar |
| `GET /books` | Lista completa dos livros |
| `GET /books/:id` | Um livro pelo id; `404` com `{ "message": "Livro não encontrado" }` se não existir |

Para testar, abra no navegador:

- http://localhost:3000/health
- http://localhost:3000/books
- http://localhost:3000/books/liv-001
- http://localhost:3000/books/liv-999 (404)

## CORS

O frontend roda em `http://localhost:5173`, uma origem diferente da API. Por isso o
`server.ts` registra o `@fastify/cors` liberando só essa origem.

## Observações

- Sem banco de dados nesta etapa: os dados vivem em `src/data/books.ts`.
- Com `logger: true`, cada requisição aparece no terminal com `statusCode` e
  `responseTime` (usado na análise de performance).
- Nas próximas etapas do projeto, estes dados irão para um PostgreSQL.
