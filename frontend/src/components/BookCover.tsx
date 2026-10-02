import "./BookCover.css";

type BookCoverProps = {
  title: string;
  genre: string;
  size?: "card" | "details";
};

// Cada gênero tem uma cor, para dar identidade visual às capas.
// Como o acervo é próprio (vem da nossa API), não dependemos de imagens
// externas: a "capa" é desenhada em CSS a partir do título e do gênero.
const GENRE_COLORS: Record<string, string> = {
  "Literatura Brasileira": "#1e3a5f",
  "Literatura Clássica": "#5b4636",
  Distopia: "#7f1d1d",
  "Ficção Científica": "#0f766e",
  Fantasia: "#5b21b6",
  Tecnologia: "#1d4ed8",
  Ciências: "#0369a1",
  História: "#92400e",
  Filosofia: "#334155",
  Psicologia: "#9d174d",
  Negócios: "#065f46",
  Poesia: "#b45309",
  Biografia: "#374151",
};

function BookCover({ title, genre, size = "card" }: BookCoverProps) {
  const color = GENRE_COLORS[genre] ?? "#1e3a5f";

  return (
    <div
      className={`book-cover book-cover-${size}`}
      style={{ background: `linear-gradient(150deg, ${color}, #0b1320)` }}
      aria-hidden="true"
    >
      <span className="book-cover-genre">{genre}</span>
      <span className="book-cover-title">{title}</span>
    </div>
  );
}

export default BookCover;
