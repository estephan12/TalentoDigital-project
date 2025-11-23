import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/PageTransition/PageTransition';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${API_URL}/api/auth/register-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                login(data.user, data.token);
                alert('¡Registro exitoso! Disfruta tu 10% de descuento.');
                navigate('/');
            } else {
                setError(data.message || 'Error al registrarse');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        }
    };

    return (
        <PageTransition>
            <section className="section-padding" style={{ paddingTop: '150px', minHeight: '80vh' }}>
                <div className="container" style={{ maxWidth: '400px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Crear Cuenta</h2>

                    {error && <div style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '1rem' }}>{error}</div>}

                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Nombre Completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Registrarse</button>
                    </form>

                    <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                        ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--color-accent-blue)' }}>Inicia Sesión</Link>
                    </p>
                </div>
            </section>
        </PageTransition>
    );
}

export default Register;
