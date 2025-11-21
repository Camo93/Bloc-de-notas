import { Router } from 'express';
import { obtenerNotas, crearNota, editarNota, borrarNota } from '../controllers/notas.controller.js';

const router = Router();

router.get('/', obtenerNotas);
router.post('/', crearNota);
router.put('/:id', editarNota);
router.delete('/:id', borrarNota);

export default router;
