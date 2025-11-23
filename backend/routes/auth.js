import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import AdminUser from '../models/AdminUser.js';
import User from '../models/User.js';

const router = express.Router();

// Register admin (one-time) - protected by ADMIN_TOKEN in env
router.post('/register', async (req, res) => {
  const adminToken = req.headers['x-admin-token'] || req.body.adminToken;
  if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ success: false, message: 'Token de registro inválido' });
  }

  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email y password requeridos' });

  try {
    const existing = await AdminUser.findOne({ email });
    if (existing) return res.status(409).json({ success: false, message: 'Admin ya existe' });

    const hash = await bcrypt.hash(password, 10);
    const admin = new AdminUser({ email, passwordHash: hash });
    await admin.save();
    return res.status(201).json({ success: true, message: 'Admin creado' });
  } catch (err) {
    console.error('Error creando admin:', err.message || err);
    return res.status(500).json({ success: false, message: 'Error creando admin' });
  }
});

// Login: buscar admin en BD y comparar hash
router.post('/login', async (req, res) => {
  const { user, pass } = req.body || {};
  if (!user || !pass) return res.status(400).json({ success: false, message: 'Faltan credenciales' });

  try {
    const admin = await AdminUser.findOne({ email: user });
    if (!admin) return res.status(401).json({ success: false, message: 'Usuario no encontrado' });

    const match = await bcrypt.compare(pass, admin.passwordHash);
    if (!match) return res.status(401).json({ success: false, message: 'Credenciales inválidas' });

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) return res.status(500).json({ success: false, message: 'JWT_SECRET no configurado' });

    const token = jwt.sign({ user: admin.email, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
    return res.status(200).json({ success: true, token });
  } catch (err) {
    console.error('Error login admin:', err.message || err);
    return res.status(500).json({ success: false, message: 'Error en login' });
  }
});

// --- RUTAS PARA USUARIOS NORMALES ---

// Registro de usuario
router.post('/register-user', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'El email ya está registrado' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, passwordHash: hash });
    await user.save();

    // Generar token automáticamente al registrarse
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id, name: user.name, role: 'user' }, JWT_SECRET, { expiresIn: '24h' });

    return res.status(201).json({
      success: true,
      message: 'Usuario registrado con éxito',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Error registrando usuario:', err);
    return res.status(500).json({ success: false, message: 'Error al registrar usuario' });
  }
});

// Login de usuario
router.post('/login-user', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email y contraseña requeridos' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id, name: user.name, role: 'user' }, JWT_SECRET, { expiresIn: '24h' });

    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Error login usuario:', err);
    return res.status(500).json({ success: false, message: 'Error en login' });
  }
});

export default router;
