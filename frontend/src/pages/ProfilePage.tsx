import { Link } from "react-router-dom";
import type { Reservation } from "../types/Reservation";
import type { User } from "../types/User";
import "./ProfilePage.css";

type ProfilePageProps = {
  user: User;
  reservations: Reservation[];
  maxReservations: number;
  onLogout: () => void;
};

function ProfilePage({
  user,
  reservations,
  maxReservations,
  onLogout,
}: ProfilePageProps) {
  // Iniciais do nome para o "avatar" simples
  const initials = user.name
    .split(" ")
    .map((parte) => parte[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">Minha conta</span>
        <h1>Meu perfil</h1>
        <p>Seus dados de aluno e o histórico de reservas na biblioteca.</p>
      </section>

      <section className="profile-card">
        <div className="profile-avatar">{initials}</div>
        <div className="profile-data">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p className="profile-course">{user.course}</p>
        </div>
      </section>

      <section className="summary">
        <article className="summary-card">
          <strong>{reservations.length}</strong>
          <span>reserva(s) ativa(s)</span>
        </article>
        <article className="summary-card">
          <strong>{maxReservations - reservations.length}</strong>
          <span>reserva(s) ainda disponível(is)</span>
        </article>
      </section>

      <section className="profile-history">
        <h2>Histórico de reservas</h2>
        {reservations.length === 0 ? (
          <p className="profile-empty">
            Você ainda não reservou livros.{" "}
            <Link to="/livros">Ver o catálogo</Link>.
          </p>
        ) : (
          <ul>
            {reservations.map((reservation) => (
              <li key={reservation.bookId}>
                <Link to={`/livro/${reservation.bookId}`}>
                  {reservation.title}
                </Link>{" "}
                — reservado em {reservation.reservedAt}
              </li>
            ))}
          </ul>
        )}
      </section>

      <button type="button" className="button button-secondary" onClick={onLogout}>
        Sair da conta
      </button>
    </main>
  );
}

export default ProfilePage;
