import mongoose from 'mongoose';
const notaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
}, {
  timestamps: true
});
export default mongoose.model('Nota', notaSchema);
