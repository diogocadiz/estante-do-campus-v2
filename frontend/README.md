# Estante do Campus — Frontend (React + TypeScript + Vite)

Interface do projeto evolutivo (N1). Consome a API Fastify da pasta `../backend`.

## Requisitos

- Node.js 20 ou mais novo.
- O backend rodando em `http://localhost:3000` (veja `../backend`).

## Instalar e executar

```bash
npm install
npm run dev
```

Abra o endereço mostrado pelo Vite (normalmente `http://localhost:5173`).

O endereço da API está em `src/services/bookService.ts` (`API_URL`).

## Scripts

- `npm run dev` — ambiente de desenvolvimento (Vite).
- `npm run build` — checagem de tipos (`tsc -b`) + build de produção.
- `npm run preview` — serve o build de produção localmente.

## Organização

```text
src/
├── components/   peças reutilizáveis (Header, BookCard, BookCover, StatusMessage)
├── pages/        uma página por rota + a tela de login
├── services/     fetch da API Fastify (bookService.ts)
├── data/         usuários do login mockado
├── types/        tipos TypeScript (Book, User, Reservation)
├── App.tsx       rotas e estados compartilhados (usuário e reservas)
└── index.css     estilos globais
```

Detalhes gerais e checklist da N1 estão no `README.md` da raiz; a análise de
performance está em `../PERFORMANCE.md`.
