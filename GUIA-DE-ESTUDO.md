# Guia de estudo — Estante do Campus v2 (N1)

Este guia é para a **apresentação**, que vale 30 dos 40 pontos. Ele mostra onde está cada
coisa no código, como os dados andam de uma ponta à outra e o que o professor provavelmente
vai perguntar ou pedir para alterar ao vivo. Os conceitos básicos de React (componente, props,
estado, eventos) continuam os mesmos do guia da v1.

---

## 1. A ideia em uma frase

Um sistema para o aluno **consultar o acervo da biblioteca do campus e reservar livros** para
retirar no balcão. Na N1 o acervo deixou de vir da Open Library e passou a vir de **uma API
nossa, feita em Fastify**.

## 2. Arquitetura

```text
Navegador (React, porta 5173)  --fetch GET /books-->  Fastify (porta 3000)  -->  array em memória
                               <------- JSON --------
```

- **Frontend** (`frontend/`): telas, rotas, estado, login mockado, reservas.
- **Backend** (`backend/`): recebe a requisição HTTP, pega os livros do array e devolve JSON.
- Eles só conversam por **HTTP**. O React não sabe como o backend guarda os dados; só conhece
  o **contrato da API**: a URL, o método, o status e o formato do JSON (o tipo `Book`, que é
  igual nos dois lados).

## 3. Mapa dos arquivos

| Arquivo | O que faz |
| --- | --- |
| `backend/src/server.ts` | Cria o Fastify, registra o CORS e as rotas `/`, `/health`, `/books`, `/books/:id` |
| `backend/src/data/books.ts` | Os 60 livros em memória e o tipo `Book` |
| `frontend/src/App.tsx` | Estado do usuário e das reservas, login/logout e as rotas |
| `frontend/src/services/bookService.ts` | Todos os `fetch` para a API, com `response.ok` e erro de rede |
| `frontend/src/pages/LoginPage.tsx` | Formulário de login, compara com `data/users.ts` |
| `frontend/src/pages/DashboardPage.tsx` | Painel: chama `/health` e `/books`, mostra se a API está no ar |
| `frontend/src/pages/CatalogPage.tsx` | Listagem com busca, filtros e ordenação + medição de performance |
| `frontend/src/pages/BookDetailsPage.tsx` | Lê o `:id` da URL (`useParams`), chama `/books/:id`, botão de reservar |
| `frontend/src/pages/ReservationsPage.tsx` | Lista e cancela reservas |
| `frontend/src/pages/ProfilePage.tsx` | Dados do aluno e resumo das reservas |
| `frontend/src/components/` | `Header` (navbar), `BookCard` (com `memo`), `BookCover`, `StatusMessage` |
| `frontend/src/types/` | Tipos `Book`, `User`, `Reservation` |

## 4. O backend, linha por linha (o que dizer)

```ts
const app = Fastify({ logger: true });
```
Cria o servidor. O `logger` mostra cada requisição no terminal, com status e `responseTime`.

```ts
await app.register(cors, { origin: "http://localhost:5173" });
```
**CORS**: o React (porta 5173) e a API (porta 3000) são origens diferentes. Sem isso o
**navegador** bloqueia a resposta. O servidor até responde, mas o navegador não entrega ao JS.
Liberamos só a origem do nosso front (a aula diz para não usar `origin: true` em produção).

```ts
app.get("/books", async () => { return books; });
```
Rota GET. O Fastify transforma o array em JSON sozinho e responde 200.

```ts
app.get("/books/:id", async (request, reply) => {
  const { id } = request.params as { id: string };
  const book = books.find((book) => book.id === id);
  if (!book) return reply.status(404).send({ message: "Livro não encontrado" });
  return book;
});
```
`:id` é parâmetro de rota, lido em `request.params`. O `find` procura o livro. Se não achar,
responde **404**, o status certo para "recurso não existe".

## 5. O fluxo de dados no frontend

Exemplo: abrir o Catálogo.

1. A rota `/livros` renderiza o `CatalogPage`.
2. O `useEffect(..., [])` roda **uma vez**, depois da primeira renderização, e chama `getBooks()`.
3. Enquanto espera, `loading` é `true`, e a tela mostra "Carregando livros...".
4. `getBooks()` faz `fetch("http://localhost:3000/books")`:
   - se o servidor está desligado, o `fetch` lança erro → `catch` → mensagem de conexão;
   - se respondeu com erro (404, 500), `response.ok` é `false` → lançamos `Erro HTTP: 404`;
   - se deu certo, `response.json()` transforma o JSON em array de `Book`.
5. `setBooks(data)` muda o estado e o React desenha os cards com `map`.
6. `finally` coloca `loading` em `false` nos dois casos (sucesso ou erro).

Os quatro estados de tela: **carregando**, **erro** (`StatusMessage type="error"`),
**vazio** ("Nenhum livro encontrado.") e **sucesso** (a grade de cards).

## 6. Login mockado e área autenticada

- `App.tsx` guarda `user` no estado. Se `user` é `null`, **qualquer** endereço mostra o login
  (área pública). Com usuário, aparecem a navbar e as rotas (área autenticada).
- `LoginPage` compara e-mail e senha com a lista de `data/users.ts`. É mockado: não tem
  servidor nem token (o enunciado diz que autenticação real não é cobrada na N1).
- **Sair** chama `handleLogout`, que zera `user` e as reservas.
- Limitação: ao apertar F5, o estado some e volta para o login.

## 7. Performance (resumo do `PERFORMANCE.md`)

- **Medi** o filtro com `console.time`: 0,02 ms com 60 livros e 0,2 ms com 1.000. Não é gargalo,
  por isso não otimizei o filtro.
- **Medi** as renderizações: sem `memo`, todos os `BookCard` renderizavam de novo a cada tecla.
  Com 1.000 livros, a primeira letra levava ~281 ms.
- **Otimizei** com `memo(BookCard)`: o card só renderiza se as props mudarem. Caiu para ~48 ms.
  No React Profiler, a renderização da primeira letra foi de 189 ms para 13 ms
  (gráfico em `docs/grafico-profiler-memo.png`).
- **Rede**: o Fastify responde em menos de 1 ms (`responseTime`) e o navegador vê 2 a 4 ms.
  A diferença é o caminho de ida e volta.

Para demonstrar: `SIMULAR_ACERVO_GRANDE = true` no `CatalogPage.tsx`, descomentar o
`console.log` do `BookCard` e digitar na busca com o Console aberto. Depois, trocar
`export default memo(BookCard)` por `export default BookCard` e repetir.

## 8. Roteiro de apresentação (8 a 12 min)

1. **Problema e proposta** (1 min): biblioteca do campus, consultar e reservar.
2. **Demo** (3 min): login errado → login certo → Painel (API conectada) → Catálogo com busca,
   filtro e ordenação → Detalhes → Reservar → Minhas reservas → Perfil → Sair.
3. **Network** (2 min): F12 → Network → Fetch/XHR → `GET /books`: status 200, Headers,
   Response (JSON), Timing. Mostrar o mesmo pedido no terminal do Fastify.
   Depois parar o backend (Ctrl+C), recarregar e mostrar a mensagem de erro.
4. **Código** (3 min): `server.ts` → `bookService.ts` → `CatalogPage.tsx` (useEffect, estados,
   filter/map) → `App.tsx` (rotas e login).
5. **Performance** (2 min): tabela antes/depois e a demonstração do item 7.

## 9. Perguntas prováveis

- **Por que o `fetch` fica dentro do `useEffect`?** Para rodar depois da renderização e só uma
  vez (`[]`). Fora dele, cada renderização faria uma nova requisição, e o `setBooks` causaria
  outra renderização, em loop.
- **Por que checar `response.ok`?** O `fetch` só cai no `catch` em erro de rede. Um 404 ou 500
  é uma resposta válida para ele; quem decide que é erro somos nós.
- **O que é CORS e onde ele é aplicado?** Regra de segurança **do navegador**. Quem libera é o
  **servidor**, com o header `Access-Control-Allow-Origin` (o plugin `@fastify/cors` coloca).
- **Diferença entre props e estado?** Props vêm do pai e o componente só lê. Estado é do próprio
  componente e muda com `set...`, o que faz o React renderizar de novo.
- **Por que as reservas ficam no `App` e não na página?** Porque várias páginas usam (Header,
  Detalhes, Reservas, Perfil, Catálogo). O estado sobe para o pai comum e desce por props.
- **Para que serve a `key` no `map`?** Para o React saber qual item é qual entre renderizações.
  Usamos o `id` do livro, que é único e estável.
- **Por que não usou `memo` em tudo?** O `memo` também tem custo (comparar props). A aula diz
  para aplicar onde houver problema medido, e foi o que fizemos.
- **Os dados persistem?** Não. Ficam em memória no servidor; ao reiniciar, voltam ao inicial.
  Na próxima etapa vão para o PostgreSQL.

## 10. Alterações ao vivo (treine estas)

| Pedido do professor | Onde mexer |
| --- | --- |
| "Mostre o número de páginas no card" | `BookCard.tsx`: `<p>{book.pages} páginas</p>` |
| "Filtre também pelo gênero no texto da busca" | `CatalogPage.tsx`, no `matchesSearch`: `\|\| book.genre.toLowerCase().includes(text)` |
| "Nova opção de ordenação: mais páginas" | `CatalogPage.tsx`: adicionar ao `SortOption`, ao `sort` e um `<option>` |
| "Mude o limite de reservas para 5" | `App.tsx`: `const MAX_RESERVATIONS = 5;` |
| "Crie uma rota nova na API" | `server.ts`: `app.get("/genres", async () => [...new Set(books.map((b) => b.genre))]);` |
| "Simule um erro" | Parar o backend (Ctrl+C) ou trocar a URL em `bookService.ts` para `/bookss` (vira 404) |
| "Mude a rota /livros para /acervo" | `App.tsx` (`path`) e `Header.tsx` (`NavLink to`) |
| "Mostre a requisição" | F12 → Network → Fetch/XHR → clicar em `books` |

## 11. Como rodar (dois terminais)

```bash
# terminal 1
cd backend
npm install
npm run dev      # http://localhost:3000

# terminal 2
cd frontend
npm install
npm run dev      # http://localhost:5173
```

Login de teste: `diogo@campus.edu` / `123456`.
