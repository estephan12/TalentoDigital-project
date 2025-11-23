import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres']
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
    },
    mensaje: {
      type: String,
      required: [true, 'El mensaje es requerido'],
      trim: true,
      minlength: [5, 'El mensaje debe tener al menos 5 caracteres'],
      maxlength: [5000, 'El mensaje no puede exceder 5000 caracteres']
    },
    leido: {
      type: Boolean,
      default: false
    },
    fecha: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;
