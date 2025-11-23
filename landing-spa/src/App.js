import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Importa componentes de layout
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Importa las "páginas"
import Home from './pages/Home';
import Products from './pages/Products';
import Benefits from './pages/Benefits';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <div className="App"> {/* Puedes usar una clase global si la tenías */}

        {/* Header se muestra en TODAS las páginas */}
        <Header />

        {/* El contenido principal que cambiará según la ruta */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modelos" element={<Products />} />
            <Route path="/beneficios" element={<Benefits />} />
            <Route path="/caracteristicas" element={<Features />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Puedes agregar una ruta 404: <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>

        {/* Footer se muestra en TODAS las páginas */}
        <Footer />

      </div>
    </AuthProvider>
  );
}

export default App;