import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks, getHealth } from "../services/bookService";
import type { Book } from "../types/Book";
import type { Reservation } from "../types/Reservation";
import type { User } from "../types/User";
import "./DashboardPage.css";

type DashboardPageProps = {
  user: User;
  reservations: Reservation[];
  maxReservations: number;
};

function DashboardPage({
  user,
  reservations,
  maxReservations,
}: DashboardPageProps) {
  const remaining = maxReservations - reservations.length;

  // Dados vindos da NOSSA API Fastify:
  // GET /health diz se a API está no ar e GET /books traz o acervo.
  const [books, setBooks] = useState<Book[]>([]);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        await getHealth();
        const data = await getBooks();
        setBooks(data);
        setApiOnline(true);
      } catch {
        // Se a API estiver desligada, o painel continua funcionando,
        // apenas sinaliza que o acervo está indisponível no momento.
        setApiOnline(false);
      }
    }

    loadDashboard();
  }, []);

  // Soma os exemplares disponíveis de todos os livros
  const availableCopies = books.reduce(
    (total, book) => total + book.available,
    0
  );

  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">{user.course}</span>
        <h1>Bem-vindo(a), {user.name}!</h1>
        <p>
          Consulte o acervo da biblioteca, veja os detalhes de cada livro e
          reserve para retirar no balcão.
        </p>
      </section>

      <section className="summary">
        <article className="summary-card">
          <strong>{reservations.length}</strong>
          <span>livro(s) reservado(s)</span>
        </article>

        <article className="summary-card">
          <strong>{remaining}</strong>
          <span>reserva(s) disponível(is) de {maxReservations}</span>
        </article>

        <article className="summary-card">
          <strong>{apiOnline ? books.length : "—"}</strong>
          <span>livros no acervo</span>
        </article>

        <article className="summary-card">
          <strong>{apiOnline ? availableCopies : "—"}</strong>
          <span>exemplares disponíveis</span>
        </article>
      </section>

      <section className="api-status">
        {apiOnline === null && <span>Verificando a API...</span>}
        {apiOnline === true && (
          <span className="api-dot api-on">
            API conectada — dados do acervo vindos do servidor Fastify
          </span>
        )}
        {apiOnline === false && (
          <span className="api-dot api-off">
            API offline — inicie o servidor (pasta backend) para ver o acervo
          </span>
        )}
      </section>

      <section className="dashboard-actions">
        <Link to="/livros" className="button">
          Consultar o catálogo
        </Link>
        <Link to="/reservas" className="button button-secondary">
          Ver minhas reservas
        </Link>
      </section>

      <section className="rules">
        <h2>Regras da biblioteca</h2>
        <ul>
          <li>Cada aluno pode ter até {maxReservations} reservas ao mesmo tempo.</li>
          <li>O livro reservado fica separado no balcão por 2 dias úteis.</li>
          <li>Leve sua carteirinha de estudante para retirar o livro.</li>
        </ul>
      </section>
    </main>
  );
}

export default DashboardPage;
