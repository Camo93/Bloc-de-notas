import express from 'express';
import cors from 'cors';
import { connectDB } from './database.js';
import notasRoutes from './routes/notas.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/notas', notasRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT} 🚀`);
});
