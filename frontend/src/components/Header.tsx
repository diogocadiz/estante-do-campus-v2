import { Link, NavLink } from "react-router-dom";
import "./Header.css";

type HeaderProps = {
  userName: string;
  reservationsCount: number;
  onLogout: () => void;
};

function Header({ userName, reservationsCount, onLogout }: HeaderProps) {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        Estante do Campus
      </Link>

      <nav className="header-nav">
        <NavLink to="/">Painel</NavLink>
        <NavLink to="/livros">Catálogo</NavLink>
        <NavLink to="/reservas">Minhas reservas ({reservationsCount})</NavLink>
        <NavLink to="/perfil">Meu perfil</NavLink>
      </nav>

      <div className="header-user">
        <span>Olá, {userName}</span>
        <button type="button" onClick={onLogout}>
          Sair
        </button>
      </div>
    </header>
  );
}

export default Header;
