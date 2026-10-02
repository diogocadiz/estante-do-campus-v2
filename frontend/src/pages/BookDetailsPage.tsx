import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookCover from "../components/BookCover";
import StatusMessage from "../components/StatusMessage";
import { getBookById } from "../services/bookService";
import type { Book } from "../types/Book";
import type { Reservation } from "../types/Reservation";
import "./BookDetailsPage.css";

type BookDetailsPageProps = {
  reservations: Reservation[];
  maxReservations: number;
  onReserve: (book: Book) => void;
};

function BookDetailsPage({
  reservations,
  maxReservations,
  onReserve,
}: BookDetailsPageProps) {
  // O id do livro vem da URL: /livro/liv-001
  const { id } = useParams<{ id: string }>();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBook() {
      if (!id) return;

      setLoading(true);
      setError("");

      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (err) {
        const mensagem =
          err instanceof Error
            ? err.message
            : "Não foi possível carregar os detalhes deste livro.";
        setError(mensagem);
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        <StatusMessage type="loading" text="Carregando detalhes..." />
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="page">
        <StatusMessage
          type="error"
          text={error || "Livro não encontrado."}
        />
        <Link to="/livros" className="button">
          Voltar ao catálogo
        </Link>
      </main>
    );
  }

  const reservedIds = reservations.map((reservation) => reservation.bookId);
  const isReserved = reservedIds.includes(book.id);
  const limitReached = reservations.length >= maxReservations;
  const semExemplar = book.available <= 0;

  return (
    <main className="page">
      <Link to="/livros" className="back-link">
        ← Voltar ao catálogo
      </Link>

      <section className="details">
        <BookCover title={book.title} genre={book.genre} size="details" />

        <div className="details-info">
          <h1>{book.title}</h1>
          <p className="book-author">{book.authors.join(", ")}</p>
          <p className="book-year">
            {book.genre} · {book.year} · {book.pages} páginas
          </p>
          <p className="book-year">
            {book.available} de {book.copies} exemplares disponíveis
          </p>

          <h2>Sobre o livro</h2>
          <p className="details-description">{book.synopsis}</p>

          {book.subjects.length > 0 && (
            <ul className="subjects">
              {book.subjects.map((subject) => (
                <li key={subject}>{subject}</li>
              ))}
            </ul>
          )}

          {isReserved ? (
            <p className="success-message">
              Livro reservado! Retire no balcão em até 2 dias úteis.
            </p>
          ) : (
            <button
              className="button"
              type="button"
              disabled={limitReached || semExemplar}
              onClick={() => onReserve(book)}
            >
              {semExemplar
                ? "Sem exemplares disponíveis"
                : limitReached
                ? `Limite de ${maxReservations} reservas atingido`
                : "Reservar este livro"}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default BookDetailsPage;
