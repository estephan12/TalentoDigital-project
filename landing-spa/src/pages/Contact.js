import React, { useState } from 'react';
import PageTransition from '../components/PageTransition/PageTransition';

import { API_URL } from '../config';

function Contact() {
  // 1. Crea estados para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  // 3. Manejador para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    // Validación básica en cliente antes de enviar
    if (!nombre || nombre.trim().length < 2) {
      alert('Por favor ingresa tu nombre (mínimo 2 caracteres).');
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email || !emailRegex.test(email)) {
      alert('Por favor ingresa un email válido.');
      return;
    }
    if (!mensaje || mensaje.trim().length < 5) {
      alert('Por favor escribe un mensaje más largo (mínimo 5 caracteres).');
      return;
    }

    // Enviar a backend
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, email, mensaje })
        });
        const data = await res.json();
        if (res.ok) {
          alert(data.message || '¡Mensaje enviado con éxito!');
          setNombre('');
          setEmail('');
          setMensaje('');
        } else {
          // Mostrar errores de validación del servidor si existen
          if (data && data.errors && Array.isArray(data.errors)) {
            const msgs = data.errors.map(e => e.msg || e.message || JSON.stringify(e)).join('\n');
            alert(msgs);
          } else if (data && data.message) {
            alert(data.message);
          } else {
            alert('Error al enviar el mensaje');
          }
        }
      } catch (err) {
        console.error('Error enviando mensaje:', err);
        alert('Error de red al enviar el mensaje');
      }
    })();
  };

  return (
    <PageTransition>
      <section className="contact" id="contact">
        <div className="container contact-content">
          <div className="contact-info">
            <h2>Contacta con Nosotros</h2>
            <p>Estamos aquí para ayudarte. Rellena el formulario o usa la siguiente información.</p>
            <p><strong>Email:</strong> info@laptopsfacil.com</p>
            <p><strong>Teléfono:</strong> +1 (809) 555-0123</p>
          </div>
          <div className="contact-form-container">
            <h3>Envíanos un mensaje</h3>

            {/* 2. Conecta el formulario al estado y los manejadores */}
            <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Tu Nombre"
                  required
                  value={nombre} // El valor viene del estado
                  onChange={(e) => setNombre(e.target.value)} // Actualiza el estado al escribir
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Tu Correo Electrónico"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tu Mensaje"
                  required
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
            </form>
            {/* Este div de mensaje se puede manejar con estado también */}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Contact;