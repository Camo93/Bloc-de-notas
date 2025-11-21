import Nota from '../models/Nota.js';

export const obtenerNotas = async (req, res) => {
  try {
    const notas = await Nota.find();
    res.json(notas);
  } catch (error) {
    console.error("Error obteniendo notas:", error);
    res.status(500).json({ mensaje: "Error obteniendo notas" });
  }
};

export const crearNota = async (req, res) => {
  try {
    const nuevaNota = new Nota(req.body);
    await nuevaNota.save();

    console.log("📌 Nueva nota creada:", nuevaNota);

    res.json(nuevaNota);
  } catch (error) {
    console.error("Error creando nota:", error);
    res.status(500).json({ mensaje: "Error creando nota" });
  }
};

export const editarNota = async (req, res) => {
  try {
    const notaEditada = await Nota.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(notaEditada);
  } catch (error) {
    console.error("Error editando nota:", error);
    res.status(500).json({ mensaje: "Error editando nota" });
  }
};

export const borrarNota = async (req, res) => {
  try {
    await Nota.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Nota eliminada" });
  } catch (error) {
    console.error("Error eliminando nota:", error);
    res.status(500).json({ mensaje: "Error eliminando nota" });
  }
};
