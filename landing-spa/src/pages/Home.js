import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition/PageTransition';
import { useAuth } from '../context/AuthContext';

// Importa la imagen real del hero
import heroLaptop from '../assets/images/laptop-hero.png';

function Home() {
  const { user } = useAuth();

  return (
    <PageTransition>
      <section className="hero" id="hero">
        <div className="hero-content">
          {!user && (
            <div style={{
              background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '50px',
              marginBottom: '20px',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(229, 46, 113, 0.4)',
              animation: 'pulse 2s infinite'
            }}>
              ¡Regístrate y obtén un 10% de descuento en tu primera compra!
            </div>
          )}
          <h1>Tecnología al alcance de tu mano</h1>
          <p>Descubre las mejores laptops con un solo clic.</p>
          <div className="hero-laptop-container">
            {/* Usa la imagen del hero desde assets */}
            <img className="hero-laptop floating" src={heroLaptop} alt="Laptop Flotando" />
          </div>
          <div className="cta-buttons">
            {/* 3. Usa Link para navegar a otras rutas */}
            <Link to="/modelos" className="btn btn-primary">Ver Modelos</Link>
            <Link to="/contacto" className="btn btn-secondary">Contactar</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Home;