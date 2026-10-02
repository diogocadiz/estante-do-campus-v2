import { memo } from "react";
import { Link } from "react-router-dom";
import type { Book } from "../types/Book";
import BookCover from "./BookCover";
import "./BookCard.css";

type BookCardProps = {
  book: Book;
  isReserved: boolean;
};

function BookCard({ book, isReserved }: BookCardProps) {
  // Para ver no Console quantos cards renderizam a cada tecla, descomente:
  // console.log("render BookCard", book.title);

  return (
    <article className="book-card">
      <BookCover title={book.title} genre={book.genre} />

      <h2>{book.title}</h2>

      <p className="book-author">{book.authors.join(", ")}</p>

      <p className="book-year">
        {book.genre} · {book.year}
      </p>

      {isReserved ? (
        <span className="badge">Reservado por você</span>
      ) : book.available > 0 ? (
        <span className="badge badge-ok">{book.available} disponível(is)</span>
      ) : (
        <span className="badge badge-out">Sem exemplares</span>
      )}

      <Link to={`/livro/${book.id}`} className="button">
        Ver detalhes
      </Link>
    </article>
  );
}

// memo evita re-renderizar o card quando as props (book e isReserved) não mudaram.
// Medido no React Profiler com 1.000 livros: a 1ª tecla da busca caiu de
// 189 ms para 13 ms de renderização (ver PERFORMANCE.md).
export default memo(BookCard);
