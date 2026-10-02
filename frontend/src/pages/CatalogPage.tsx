import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import StatusMessage from "../components/StatusMessage";
import { getBooks } from "../services/bookService";
import type { Book } from "../types/Book";
import type { Reservation } from "../types/Reservation";
import "./CatalogPage.css";

type CatalogPageProps = {
  reservations: Reservation[];
};

type SortOption = "relevancia" | "titulo" | "ano-novo" | "ano-antigo";

// PERFORMANCE: troque para true para medir com uma lista grande, como na aula.
// O acervo de 60 livros vira 1.000 itens (cópias com ids diferentes).
const SIMULAR_ACERVO_GRANDE = false;

function simulateLargeCollection(books: Book[]): Book[] {
  return Array.from({ length: 1000 }, (_, index) => {
    const book = books[index % books.length];
    return { ...book, id: `${book.id}-${index}` };
  });
}

function CatalogPage({ reservations }: CatalogPageProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [genreFilter, setGenreFilter] = useState("todos");
  const [sortBy, setSortBy] = useState<SortOption>("relevancia");

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      setError("");

      try {
        const data = await getBooks();
        setBooks(SIMULAR_ACERVO_GRANDE ? simulateLargeCollection(data) : data);
      } catch (err) {
        // Mostra a mensagem que veio do serviço (API offline, erro HTTP...)
        const mensagem =
          err instanceof Error
            ? err.message
            : "Não foi possível carregar o catálogo.";
        setError(mensagem);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  // Lista com os ids dos livros que o aluno já reservou
  const reservedIds = reservations.map((reservation) => reservation.bookId);

  // Lista de gêneros para o select, sem repetição (Set), em ordem alfabética
  const genres = [...new Set(books.map((book) => book.genre))].sort();

  // -------------------------------------------------------------
  // PERFORMANCE
  // Filtrar + ordenar roda de novo a cada tecla digitada na busca.
  // console.time / console.timeEnd mostram no Console quanto tempo leva.
  // -------------------------------------------------------------
  console.time("filtrar+ordenar catalogo");

  const text = search.toLowerCase();

  const filteredBooks = books
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(text) ||
        book.authors.join(" ").toLowerCase().includes(text);

      const matchesGenre = genreFilter === "todos" || book.genre === genreFilter;

      const isReserved = reservedIds.includes(book.id);
      const matchesStatus =
        statusFilter === "todos" ||
        (statusFilter === "reservados" && isReserved) ||
        (statusFilter === "disponiveis" && !isReserved);

      return matchesSearch && matchesGenre && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "titulo") return a.title.localeCompare(b.title);
      if (sortBy === "ano-novo") return b.year - a.year;
      if (sortBy === "ano-antigo") return a.year - b.year;
      return 0; // padrão = ordem original do acervo
    });

  console.timeEnd("filtrar+ordenar catalogo");

  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">Acervo</span>
        <h1>Catálogo de livros</h1>
        <p>Livros do acervo entregues pela nossa API (Fastify).</p>
      </section>

      <section className="catalog-filters">
        <div className="field">
          <label htmlFor="search">Buscar por título ou autor</label>
          <input
            id="search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Ex.: Machado, código, Duna..."
          />
        </div>

        <div className="field">
          <label htmlFor="genre">Gênero</label>
          <select
            id="genre"
            value={genreFilter}
            onChange={(event) => setGenreFilter(event.target.value)}
          >
            <option value="todos">Todos os gêneros</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="status">Situação</label>
          <select
            id="status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="todos">Todos os livros</option>
            <option value="disponiveis">Ainda não reservados por mim</option>
            <option value="reservados">Reservados por mim</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="sort">Ordenar por</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
          >
            <option value="relevancia">Padrão</option>
            <option value="titulo">Título (A–Z)</option>
            <option value="ano-novo">Ano (mais novo)</option>
            <option value="ano-antigo">Ano (mais antigo)</option>
          </select>
        </div>
      </section>

      {loading && <StatusMessage type="loading" text="Carregando livros..." />}

      {error && <StatusMessage type="error" text={error} />}

      {!loading && !error && (
        <>
          <p className="catalog-count">
            {filteredBooks.length} livro(s) encontrado(s)
          </p>

          {filteredBooks.length === 0 ? (
            <StatusMessage type="empty" text="Nenhum livro encontrado." />
          ) : (
            <section className="book-grid" aria-label="Lista de livros">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  isReserved={reservedIds.includes(book.id)}
                />
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default CatalogPage;
