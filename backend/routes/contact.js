import express from 'express';
import { body } from 'express-validator';
import {
  createContactMessage,
  getAllMessages,
  markMessageAsRead,
  deleteMessage
} from '../controllers/contactController.js';
import { authenticate } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Limiter específico para POST de contacto (para evitar spam)
const contactLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10, message: { success: false, message: 'Demasiadas solicitudes. Intenta más tarde.' } });

// Rutas públicas
router.post('/', contactLimiter, [
  body('nombre').isLength({ min: 2 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('mensaje').isLength({ min: 5, max: 5000 }).trim().escape()
], createContactMessage); // POST /api/contact - Enviar mensaje

// Rutas privadas (protegidas - para admin)
router.get('/', authenticate, getAllMessages); // GET /api/contact - Obtener todos los mensajes
router.put('/:id/read', authenticate, markMessageAsRead); // PUT /api/contact/:id/read - Marcar como leído
router.delete('/:id', authenticate, deleteMessage); // DELETE /api/contact/:id - Eliminar mensaje

export default router;
