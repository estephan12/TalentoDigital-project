import ContactMessage from '../models/ContactMessage.js';
import { validationResult } from 'express-validator';

// Crear un nuevo mensaje de contacto
export const createContactMessage = async (req, res) => {
  try {
    // Validación con express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { nombre, email, mensaje } = req.body;

    // Crear documento
    const newMessage = new ContactMessage({ nombre, email, mensaje });
    await newMessage.save();

    return res.status(201).json({ success: true, message: '¡Mensaje enviado exitosamente! Te contactaremos pronto.' });
  } catch (error) {
    console.error('Error al guardar mensaje de contacto:', error.message || error);
    return res.status(500).json({ success: false, message: 'Error al enviar el mensaje. Por favor intenta de nuevo.' });
  }
};

// Obtener todos los mensajes (solo para admin)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ fecha: -1 });
    return res.status(200).json({
      success: true,
      data: messages,
      total: messages.length
    });
  } catch (error) {
    console.error('Error al obtener mensajes:', error.message || error);
    return res.status(500).json({ success: false, message: 'Error al obtener los mensajes' });
  }
};

// Marcar mensaje como leído
export const markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { leido: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Mensaje marcado como leído',
      data: message
    });
  } catch (error) {
    console.error('Error al marcar mensaje como leído:', error.message || error);
    return res.status(500).json({ success: false, message: 'Error al actualizar el mensaje' });
  }
};

// Eliminar mensaje
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await ContactMessage.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Mensaje eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar mensaje:', error.message || error);
    return res.status(500).json({ success: false, message: 'Error al eliminar el mensaje' });
  }
};
