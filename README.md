# Estante do Campus — v2 (N1, Projeto Evolutivo)

Sistema web para os alunos consultarem o acervo da biblioteca do campus e
reservarem livros para retirar no balcão.

Esta é a **segunda etapa** (N1) do projeto evolutivo da disciplina
Programação para Sistemas Web (2026.2). Evolui a Atividade Avaliativa
(frontend em React) adicionando uma **integração inicial com um backend
Fastify** e uma **investigação de performance**.

## Integrante

- Diogo Leal Cadiz

## O que mudou da Atividade Avaliativa (v1) para a N1 (v2)

| Área | v1 (Atividade) | v2 (N1) |
| --- | --- | --- |
| Fonte de dados | API pública Open Library | **API própria em Fastify** (`/health`, `/books`, `/books/:id`) |
| Backend | nenhum | **servidor Fastify** (TypeScript + tsx), dados em memória, CORS |
| Rota de detalhes | estado em memória (`/livro`) | **`/livro/:id`** (deep link, busca por id na API) |
| Rotas | 4 + 404 | **5 + 404** (nova página **Meu perfil**) |
| Catálogo | busca + filtro | busca + filtro por gênero + situação + **ordenação** |
| Performance | — | **`memo` no `BookCard`**, com medição antes/depois (ver `PERFORMANCE.md`) |
| Painel | estático | mostra o **status da API** (`/health`) e números do acervo (`/books`) |

## Estrutura do repositório

```text
estante-do-campus-v2/
├── frontend/        Aplicação React + TypeScript + Vite
├── backend/         API inicial em Node.js + Fastify (TypeScript)
├── README.md        este arquivo
└── PERFORMANCE.md   investigação de performance (medição antes/depois)
```

## Como executar

Pré-requisito: **Node.js 20 ou mais novo**.

São **dois processos**: a API (backend) e o site (frontend). O jeito mais
simples é abrir **dois terminais**.

### 1) Backend (API Fastify)

```bash
cd backend
npm install
npm run dev
```

A API sobe em `http://localhost:3000`. Para conferir, abra
`http://localhost:3000/health` no navegador. Deve aparecer `{"status":"ok"}`.

### 2) Frontend (React)

Em **outro terminal**:

```bash
cd frontend
npm install
npm run dev
```

Abra o endereço que o Vite mostrar, normalmente `http://localhost:5173`.

> O endereço da API fica em `frontend/src/services/bookService.ts` (`API_URL`).
> O CORS do backend só libera `http://localhost:5173`, a porta padrão do Vite.

### Contas de teste (login mockado)

| E-mail | Senha |
| --- | --- |
| diogo@campus.edu | 123456 |
| ana@campus.edu | biblioteca |

## Rotas do frontend

| Rota | Página | O que faz |
| --- | --- | --- |
| `/` | Painel | Resumo do aluno + status/números da API |
| `/livros` | Catálogo | Listagem com busca, filtros e ordenação |
| `/livro/:id` | Detalhes | Livro buscado na API pelo id da URL |
| `/reservas` | Minhas reservas | Lista e cancela reservas |
| `/perfil` | Meu perfil | Dados do aluno e histórico de reservas |
| `*` | 404 | Qualquer endereço inexistente |

Sem login, qualquer rota mostra a tela de entrada (área pública x autenticada).

## Endpoints do backend

| Método e rota | O que devolve |
| --- | --- |
| `GET /` | `{ message: "..." }`: rota raiz |
| `GET /health` | `{ status: "ok" }`: prova que a API está no ar |
| `GET /books` | Acervo completo (60 livros) |
| `GET /books/:id` | Um livro pelo id; `404` se não existir |

Os dados ficam **em memória** em `backend/src/data/books.ts` (sem banco nesta etapa).

## Como a N1 é atendida (resumo)

- **Aplicação e fluxos:** login mockado, 5 rotas significativas, reservas.
- **React/TypeScript:** componentes (`Header`, `BookCard`, `BookCover`,
  `StatusMessage`), páginas separadas, tipos em `types/`, props e estado.
- **Dados assíncronos:** `fetch` + `async/await` + `useEffect`, com `loading`,
  vazio, erro e checagem de `response.ok` em `services/bookService.ts`.
- **Integração Fastify:** servidor separado, `/health`, `/books`, `/books/:id`, CORS
  e consumo real no Catálogo, nos Detalhes e no Painel.
- **Performance:** ver `PERFORMANCE.md` (medição, diagnóstico e antes/depois).
- **Responsividade:** grids com `auto-fit`/`minmax`; testado no Chrome em 390 px
  (celular) e 1280 px (desktop), sem rolagem horizontal.

## Como demonstrar a comunicação React → Fastify (Network)

1. Com os dois processos rodando, abra o site e faça login.
2. Abra o **DevTools (F12) → aba Network**.
3. Entre no **Catálogo**. Aparece a requisição `GET /books` (status 200).
4. Clique nela e mostre **Headers** (URL, método, status), **Response** (JSON)
   e **Timing**.
5. Para demonstrar o tratamento de erro: **pare o backend** (Ctrl+C) e recarregue
   o Catálogo — aparece a mensagem de erro de conexão.

## Checklist da N1

- [x] Instala e executa seguindo o README (backend e frontend).
- [x] `node_modules` não é versionado (`.gitignore`).
- [x] Rotas principais funcionam.
- [x] Login mockado e logout funcionam.
- [x] Navegação coerente (navbar com rota ativa).
- [x] Consumo assíncrono com loading e tratamento de erro.
- [x] Frontend consome endpoints Fastify próprios.
- [x] Interface testada em celular e desktop.
- [x] Evidência de performance em `PERFORMANCE.md`.

## Limitações conhecidas (didáticas)

- Login e reservas vivem só na memória do navegador; ao recarregar (F5), volta
  para o login. Será resolvido quando o backend ganhar persistência.
- O backend não tem banco de dados nesta etapa (dados em memória, como pede a N1).
- As senhas ficam no código porque o login é mockado (exigência do enunciado).

## Próximos passos (após a N1)

- Persistência em PostgreSQL no backend.
- Rotas `POST /reservations` e login verificado no servidor.
- Otimizações adicionais e testes de carga.
