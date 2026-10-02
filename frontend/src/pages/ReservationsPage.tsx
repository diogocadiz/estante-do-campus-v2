import { Link } from "react-router-dom";
import StatusMessage from "../components/StatusMessage";
import type { Reservation } from "../types/Reservation";
import "./ReservationsPage.css";

type ReservationsPageProps = {
  reservations: Reservation[];
  onCancel: (bookId: string) => void;
};

function ReservationsPage({ reservations, onCancel }: ReservationsPageProps) {
  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">Minha conta</span>
        <h1>Minhas reservas</h1>
        <p>Livros separados para você retirar no balcão da biblioteca.</p>
      </section>

      {reservations.length === 0 ? (
        <>
          <StatusMessage
            type="empty"
            text="Você ainda não reservou nenhum livro."
          />
          <Link to="/livros" className="button">
            Consultar o catálogo
          </Link>
        </>
      ) : (
        <ul className="reservation-list">
          {reservations.map((reservation) => (
            <li key={reservation.bookId} className="reservation-item">
              <div>
                <h2>{reservation.title}</h2>
                <p>{reservation.authors.join(", ")}</p>
                <p className="reservation-date">
                  Reservado em {reservation.reservedAt}
                </p>
              </div>

              <div className="reservation-actions">
                <Link
                  to={`/livro/${reservation.bookId}`}
                  className="button button-secondary"
                >
                  Ver livro
                </Link>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => onCancel(reservation.bookId)}
                >
                  Cancelar reserva
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default ReservationsPage;
