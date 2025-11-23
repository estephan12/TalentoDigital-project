import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/PageTransition/PageTransition';

import { API_URL } from '../config';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${API_URL}/api/auth/login-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                login(data.user, data.token);
                navigate('/'); // Redirigir al home
            } else {
                setError(data.message || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        }
    };

    return (
        <PageTransition>
            <section className="section-padding" style={{ paddingTop: '150px', minHeight: '80vh' }}>
                <div className="container" style={{ maxWidth: '400px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Iniciar Sesión</h2>

                    {error && <div style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '1rem' }}>{error}</div>}

                    <form onSubmit={handleSubmit} className="contact-form">
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
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Entrar</button>
                    </form>

                    <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                        ¿No tienes cuenta? <Link to="/register" style={{ color: 'var(--color-accent-blue)' }}>Regístrate aquí</Link>
                    </p>
                </div>
            </section>
        </PageTransition>
    );
}

export default Login;
