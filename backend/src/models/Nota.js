import mongoose from 'mongoose';

const notaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
}, {
  timestamps: true
});

// El tercer parámetro fuerza el nombre de la colección en Atlas
export default mongoose.model('Nota', notaSchema, 'notas');
