import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de seguridad y parsing
app.use(helmet());
// Logger
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// CORS: en desarrollo permitimos cualquier origen para facilitar pruebas locales;
// en producción se recomienda definir ALLOWED_ORIGINS en el .env
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
} else {
  const allowed = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'];
  app.use(cors({ origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowed.indexOf(origin) === -1) {
      const msg = 'El origen CORS no está permitido.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }}));
}

app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting global (moderado)
const globalLimiter = rateLimit({ windowMs: 60 * 1000, max: 200 });
app.use(globalLimiter);

// Logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Auth endpoints could be added under /api/auth (created in routes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Servidor backend funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error('Error:', err.message || err);
  const isDev = process.env.NODE_ENV === 'development';
  res.status(err.status || 500).json({
    success: false,
    message: isDev ? (err.message || 'Error interno del servidor') : 'Error interno del servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor backend ejecutándose en: http://localhost:${PORT}`);
  console.log(`📝 Endpoint de contacto: POST http://localhost:${PORT}/api/contact`);
  console.log(`🏥 Health check: GET http://localhost:${PORT}/api/health\n`);
});

export default app;
