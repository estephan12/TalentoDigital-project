import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ContactMessage from './models/ContactMessage.js';
import connectDB from './config/database.js';

dotenv.config();

const verifyData = async () => {
    try {
        await connectDB();
        console.log('Consultando base de datos...');

        const lastMessage = await ContactMessage.findOne().sort({ createdAt: -1 });

        if (lastMessage) {
            console.log('\n✅ Último mensaje encontrado:');
            console.log('--------------------------------');
            console.log(`Nombre: ${lastMessage.nombre}`);
            console.log(`Email: ${lastMessage.email}`);
            console.log(`Mensaje: ${lastMessage.mensaje}`);
            console.log(`Fecha: ${lastMessage.createdAt}`);
            console.log('--------------------------------\n');
        } else {
            console.log('❌ No se encontraron mensajes en la base de datos.');
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

verifyData();
