import { Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import ThemeProvider from './context/ThemeContext';
import NotificationProvider from './context/NotificationContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ToastContainer from './components/ui/Toast';
import HomePage from './pages/HomePage';
import ServiciosPage from './pages/ServiciosPage';
import CitasPage from './pages/CitasPage';
import ClientesPage from './pages/ClientesPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <div className="app-shell">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/servicios" element={<ServiciosPage />} />
              <Route path="/servicios/:id" element={<ServiciosPage />} />
              <Route path="/citas" element={<CitasPage />} />
              <Route path="/citas/nueva" element={<CitasPage />} />
              <Route path="/clientes" element={<ClientesPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <ToastContainer />
          </div>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function NotFound() {
  return (
    <main className="page">
      <div className="empty-state">
        <h1>404</h1>
        <p>🚫 La página que buscas no existe en Salon Glitt.</p>
      </div>
    </main>
  );
}

export default App;