const express = require("express");
const router = express.Router();

const alumnoController = require("../controllers/alumnoController.js");

router.get('/', alumnoController.getAllAlumnos)
    .post('/crear', alumnoController.createAlumno)
    .put('/editar', alumnoController.updateAlumno)
    .delete('/eliminar/:id', alumnoController.deleteAlumno);

module.exports = router;