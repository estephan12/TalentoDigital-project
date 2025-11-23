import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI no está definida en .env');
    }

    // Intentar parsear la URI para detectar errores frecuentes (host/tld faltante)
    try {
      const parsed = new URL(mongoURI);
      const hostname = parsed.hostname || '';
      if (!hostname || hostname.indexOf('.') === -1) {
        throw new Error('URI must include hostname, domain name, and tld');
      }
    } catch (parseErr) {
      console.error('❌ Error al parsear MONGO_URI:', parseErr.message);
      throw parseErr;
    }

    // Mostrar la URI en forma redacted (no imprimir la password completa)
    const redacted = mongoURI.replace(/:\/\/(.*?):(.*?)@/, '://$1:***@');
    console.log('🔎 MONGO_URI (redacted):', redacted);

    await mongoose.connect(mongoURI);

    console.log('✅ Conectado a MongoDB Atlas');
    return mongoose.connection;
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
