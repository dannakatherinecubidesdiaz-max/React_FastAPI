import { Link, NavLink } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

export default function Navbar() {
  const { tema, toggleTema } = useContext(ThemeContext);

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/servicios', label: 'Servicios' },
    { to: '/citas', label: 'Citas' },
    { to: '/clientes', label: 'Clientes' },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src="/logo-glitt.svg" alt="Logo Salon Glitt" className="navbar-logo" />
        <span className="navbar-title">Salon Glitt</span>
      </Link>

      <ul className="navbar-links">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <button className="btn-icon" onClick={toggleTema} aria-label="Cambiar tema">
        {tema === 'claro' ? '🌙' : '☀️'}
      </button>
    </nav>
  );
}