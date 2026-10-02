import { useState } from "react";
import { users } from "../data/users";
import type { User } from "../types/User";
import "./LoginPage.css";

type LoginPageProps = {
  onLogin: (user: User) => void;
};

function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      setError("Preencha o e-mail e a senha.");
      return;
    }

    const foundUser = users.find(
      (user) =>
        user.email === email.trim().toLowerCase() &&
        user.password === password
    );

    if (!foundUser) {
      setError("E-mail ou senha incorretos.");
      return;
    }

    onLogin(foundUser);
  }

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <span className="eyebrow">Biblioteca do campus</span>
        <h1>Estante do Campus</h1>
        <p>Entre com sua conta de aluno para consultar e reservar livros.</p>

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="seu.nome@campus.edu"
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Sua senha"
        />

        {error && <p className="form-error">{error}</p>}

        <button className="button" type="submit">
          Entrar
        </button>

        <p className="login-hint">
          Conta de teste: diogo@campus.edu / 123456
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
