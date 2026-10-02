# Investigação de Performance — Estante do Campus (N1)

Roteiro seguido, o mesmo da aula: **construir → medir → identificar → otimizar → validar**.

## 1. Ponto escolhido

**A busca do Catálogo** (`frontend/src/pages/CatalogPage.tsx`).

A cada letra digitada, o estado `search` muda e a página renderiza de novo. Nessa nova
renderização acontecem duas coisas:

1. o `filter` + `sort` percorre todos os livros;
2. o `map` desenha um `BookCard` para cada livro que passou no filtro.

A pergunta da investigação: **qual dessas duas partes custa mais e vale otimizar?**

## 2. Como medir (qualquer pessoa consegue repetir)

| Ferramenta | Onde | O que mostra |
| --- | --- | --- |
| `console.time` / `console.timeEnd` | já está no `CatalogPage.tsx` | tempo do `filter` + `sort` a cada tecla |
| `console.log` no `BookCard` | linha comentada no `BookCard.tsx` (é só descomentar) | quantos cards renderizam a cada tecla |
| React DevTools → **Profiler** | extensão do navegador | tempo de cada renderização (commit) |
| DevTools → **Network** + terminal do Fastify | aba Network / `responseTime` no log | tempo e tamanho do `GET /books` |

Para simular uma lista grande, como na aula (`Array.from` com 1.000 itens), troque no
`CatalogPage.tsx`:

```ts
const SIMULAR_ACERVO_GRANDE = true; // 60 livros viram 1.000
```

Passo a passo no Profiler: abrir o Catálogo → Profiler → **Record** → digitar `machado` →
**Stop** → clicar em cada barra (commit) e ver a duração e quais componentes renderizaram.

## 3. Medição inicial (sem `memo` no `BookCard`)

Medido em 02/10/2026, no Chrome, no PC do Diogo, em modo de desenvolvimento (`npm run dev`),
digitando `machado` letra por letra. Cada configuração foi medida duas vezes e a tabela mostra a
média. "Tempo até a tela atualizar" é o tempo entre a tecla e o navegador pintar a tela de novo.

**Acervo real (60 livros)**

| Tecla | Cards na tela | `filter`+`sort` (console.time) | Tempo até a tela atualizar |
| --- | --- | --- | --- |
| `m` | 40 | 0,02 ms | 27 ms |
| `ma` | 21 | 0,03 ms | 15 ms |
| `machado` | 3 | 0,02 ms | 8 ms |

**Acervo simulado (1.000 livros)**

| Tecla | Cards na tela | `filter`+`sort` (console.time) | Tempo até a tela atualizar |
| --- | --- | --- | --- |
| `m` | 667 | 0,2 ms | **281 ms** |
| `ma` | 351 | 0,1 ms | **95 ms** |
| `mac` | 68 | 0,1 ms | 27 ms |
| `machado` | 51 | 0,2 ms | 40 ms |

Contagem de renderizações (pelo `console.log` do `BookCard`): **todos os cards visíveis
renderizam de novo a cada tecla**, por exemplo 667 cards na primeira letra com 1.000 livros.

> Em modo dev o React usa o `StrictMode`, que renderiza tudo **duas vezes** para achar erros.
> Por isso o Console mostra o dobro de logs (1.334 em vez de 667). Em produção isso não acontece.

## 4. Diagnóstico

- **O filtro não é o problema.** Mesmo com 1.000 livros, o `filter` + `sort` leva cerca de 0,2 ms.
  Por isso **não** usamos `useMemo` no filtro: não há ganho que justifique.
- **O problema é re-renderizar os cards.** Quando a busca muda, o `CatalogPage` renderiza e,
  sem `memo`, **todos** os `BookCard` filhos renderizam junto, mesmo os que continuam iguais.
  Com 1.000 livros, a primeira letra levou ~281 ms, um atraso que dá para sentir ao digitar
  (acima de ~100 ms a interface já parece travar).
- Com os 60 livros reais o custo é pequeno (8–27 ms). Mas ele cresce junto com o acervo, e o
  acervo vai crescer quando os dados forem para o banco.

## 5. Melhoria aplicada: `memo` no `BookCard`

```tsx
// frontend/src/components/BookCard.tsx
import { memo } from "react";
// ...
export default memo(BookCard);
```

O `memo` faz o React comparar as props (`book` e `isReserved`) antes de renderizar o card.
Se não mudaram, ele reaproveita o resultado anterior. Funciona aqui porque o `filter` devolve
**os mesmos objetos** de livro: só a lista muda, os livros dentro dela não.

## 6. Depois (com `memo`): comparação

**1.000 livros**

| Tecla | Antes (sem memo) | Depois (com memo) | Cards re-renderizados (antes → depois) |
| --- | --- | --- | --- |
| `m` | 281 ms | **48 ms** | 667 → 0 |
| `ma` | 95 ms | **28 ms** | 351 → 0 |
| `mac` | 27 ms | 15 ms | 68 → 0 |
| `machado` | 40 ms | 7 ms | 51 → 0 |

**60 livros**

| Tecla | Antes | Depois |
| --- | --- | --- |
| `m` | 27 ms | 9 ms |
| `ma` | 15 ms | 8 ms |

Com `memo`, nenhum card que já estava na tela renderiza de novo ao digitar. O tempo que
sobrou é o React removendo da tela os cards que saíram do filtro.

### Confirmação com o React Profiler

Medimos de novo com o Profiler do React, que registra quanto tempo o React gastou renderizando
cada atualização (`actualDuration`, o número que aparece em cada barra da aba Profiler). Cada
configuração foi gravada 3 vezes; a tabela mostra a mediana.

**1.000 livros**

| Tecla | Sem memo | Com memo |
| --- | --- | --- |
| `m` | 188,9 ms | **13,3 ms** |
| `ma` | 58,7 ms | **9,6 ms** |
| `mac` | 37,2 ms | 3,4 ms |
| `mach` | 33,2 ms | 4,7 ms |
| `macha` | 30,0 ms | 4,0 ms |
| `machad` | 26,2 ms | 3,5 ms |
| `machado` | 29,0 ms | 3,4 ms |

**60 livros**

| Tecla | Sem memo | Com memo |
| --- | --- | --- |
| `m` | 16,5 ms | 2,2 ms |
| `ma` | 10,5 ms | 2,0 ms |
| `machado` | 4,3 ms | 1,8 ms |

Cada tecla gerou 1 commit nos dois casos. O gráfico para a apresentação está em
`docs/grafico-profiler-memo.png`.

Esse tempo é menor que o "tempo até a tela atualizar" da tabela anterior porque mede só o
trabalho do React. O outro inclui também o navegador montando e pintando a tela.

## 7. Rede: React → Fastify (`GET /books`)

| Medida | Valor |
| --- | --- |
| Tamanho da resposta (JSON com 60 livros) | ~17,9 KB |
| `responseTime` no terminal do Fastify | 0,3 a 1 ms (mediana 0,45 ms) |
| Tempo da requisição visto pelo navegador | 2 a 4 ms |

Como na aula, o navegador vê um tempo maior que o backend porque soma conexão, envio e
recebimento. Tudo roda no mesmo computador, então a diferença é pequena. Com o servidor
em outra máquina, essa diferença cresce.

## 8. Conclusão

- Medimos antes de otimizar: o filtro (0,02–0,2 ms) **não** precisava de otimização.
- O gargalo real era re-renderizar todos os `BookCard` a cada tecla. O `memo` resolveu:
  281 ms → 48 ms até a tela atualizar, e 189 ms → 13 ms de renderização no React Profiler,
  na primeira letra com 1.000 livros.
- Seguimos o que a aula recomenda: `memo` aplicado em **um** componente, com problema medido,
  e não espalhado pela aplicação "por precaução".
- Próximos passos quando o acervo vier do banco: paginação e busca no servidor.
