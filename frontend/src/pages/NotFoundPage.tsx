import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">Erro 404</span>
        <h1>Página não encontrada</h1>
        <p>O endereço digitado não existe na Estante do Campus.</p>
      </section>

      <Link to="/" className="button">
        Voltar ao início
      </Link>
    </main>
  );
}

export default NotFoundPage;
