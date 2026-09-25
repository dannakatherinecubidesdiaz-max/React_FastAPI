import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

// Tema claro/oscuro persistido en localStorage.
// Aplica una clase `dark` en <html> para que los estilos CSS reaccionen.
export default function ThemeProvider({ children }) {
  const [tema, setTema] = useState(() => localStorage.getItem('theme') || 'claro');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'oscuro');
    localStorage.setItem('theme', tema);
  }, [tema]);

  return (
    <ThemeContext.Provider value={{ tema, toggleTema: () => setTema(tema === 'claro' ? 'oscuro' : 'claro') }}>
      {children}
    </ThemeContext.Provider>
  );
}