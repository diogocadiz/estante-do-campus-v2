import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import BookDetailsPage from "./pages/BookDetailsPage";
import CatalogPage from "./pages/CatalogPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import ReservationsPage from "./pages/ReservationsPage";
import type { Book } from "./types/Book";
import type { Reservation } from "./types/Reservation";
import type { User } from "./types/User";

const MAX_RESERVATIONS = 3;

function App() {
  // Estados usados por várias páginas ficam aqui no App
  // e descem para as páginas por props.
  const [user, setUser] = useState<User | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  function handleLogin(loggedUser: User) {
    setUser(loggedUser);
  }

  function handleLogout() {
    setUser(null);
    setReservations([]);
  }

  function handleReserve(book: Book) {
    // Evita reservar o mesmo livro duas vezes
    if (reservations.some((r) => r.bookId === book.id)) return;

    const newReservation: Reservation = {
      bookId: book.id,
      title: book.title,
      authors: book.authors,
      reservedAt: new Date().toLocaleDateString("pt-BR"),
    };

    setReservations([...reservations, newReservation]);
  }

  function handleCancel(bookId: string) {
    setReservations(
      reservations.filter((reservation) => reservation.bookId !== bookId)
    );
  }

  // Sem usuário logado, qualquer página mostra o login (área pública).
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <Header
        userName={user.name}
        reservationsCount={reservations.length}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <DashboardPage
              user={user}
              reservations={reservations}
              maxReservations={MAX_RESERVATIONS}
            />
          }
        />
        <Route
          path="/livros"
          element={<CatalogPage reservations={reservations} />}
        />
        <Route
          path="/livro/:id"
          element={
            <BookDetailsPage
              reservations={reservations}
              maxReservations={MAX_RESERVATIONS}
              onReserve={handleReserve}
            />
          }
        />
        <Route
          path="/reservas"
          element={
            <ReservationsPage
              reservations={reservations}
              onCancel={handleCancel}
            />
          }
        />
        <Route
          path="/perfil"
          element={
            <ProfilePage
              user={user}
              reservations={reservations}
              maxReservations={MAX_RESERVATIONS}
              onLogout={handleLogout}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
