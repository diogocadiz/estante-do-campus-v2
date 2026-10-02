type StatusMessageProps = {
  type: "loading" | "error" | "empty";
  text: string;
};

// Mostra as mensagens de carregando, erro e lista vazia
// com o mesmo visual em todas as páginas
function StatusMessage({ type, text }: StatusMessageProps) {
  return <p className={`status-message status-${type}`}>{text}</p>;
}

export default StatusMessage;
