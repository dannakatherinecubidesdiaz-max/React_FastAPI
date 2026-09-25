export default function Footer() {
  return (
    <footer className="footer">
      <p>
        <strong>SALON GLITT</strong> · Belleza y estilo con pasión 💇‍♀️
      </p>
      <p className="footer-sub">
        Sistema creado con React + Vite conectado a la API de Spring Boot.
        <span className="badge-status">API: {import.meta.env.VITE_API_URL}</span>
      </p>
    </footer>
  );
}