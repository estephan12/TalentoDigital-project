
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import './Header.css'; // Si decides separar los estilos del Header

function Header() {
  // Estado para controlar si el menú está abierto o cerrado
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { user, logout } = useAuth();

  // Función para cambiar el estado
  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Laptops Fácil</Link>

        {/* Agregamos una clase 'active' si el menú está abierto */}
        <nav className={menuAbierto ? 'nav-menu active' : 'nav-menu'} id="nav-menu">
          <Link to="/">Inicio</Link>
          <Link to="/modelos">Modelos</Link>
          <Link to="/beneficios">Beneficios</Link>
          <Link to="/caracteristicas">Características</Link>
          <Link to="/contacto">Contacto</Link>

          {user ? (
            <>
              <span style={{ color: 'var(--color-accent-blue)', fontWeight: 'bold', alignSelf: 'center' }}>Hola, {user.name}</span>
              <button onClick={logout} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', border: '1px solid white' }}>Salir</button>
            </>
          ) : (
            <Link to="/login" className="btn-primary" style={{ padding: '0.5rem 1.5rem', borderRadius: '20px' }}>Login</Link>
          )}
        </nav>

        <button
          className={menuAbierto ? 'hamburger active' : 'hamburger'}
          id="hamburger"
          onClick={toggleMenu}
          aria-label="Abrir menú de navegación"
          aria-expanded={menuAbierto}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
