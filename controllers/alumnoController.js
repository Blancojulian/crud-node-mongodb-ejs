const Alumno = require("../model/Alumno.js");

const getAllAlumnos = async (req, res) => {
    
    try {
        const alumnos = await Alumno.find({});
        res.status(200).render('index', {alumnos: alumnos})
    } catch (err) {
        console.log(err + 'error al mostrar los alumnos');
        return res.status(500).json({message: 'Error mostrando los alumnos'});
    }
}

const createAlumno = async (req, res) => {
    const {nombre, edad, email} = req.body
    if(!nombre || !edad) return res.status(401).json({message: 'Error debe ingresar nombre y edad'});

    try {
        const emailDuplicated = await Alumno.findOne({email: email});
        if(emailDuplicated) {
            return res.redirect('/');
        }

        const alumno = await Alumno.create({nombre: nombre, edad: edad, email: email});
        res.redirect('/');
    } catch (err) {
        console.log(err + 'error al mostrar los alumnos');
        return res.status(500).json({message: 'Error mostrando los alumnos'});
    }
}

const deleteAlumno = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ message: 'ID del alumno.' });
    }
    
    try {
        const alumno = await Alumno.find({_id: req.params.id});
        if(!alumno) {
            return res.status(204).json({message: 'No hay alumno con ese ID'});
        }

        const alumnoDeleted = await Alumno.deleteOne({_id: req.params.id});
        res.redirect(303, '/');
    } catch (err) {
        console.log(err + 'error al eliminar el alumno');
        return res.status(500).json({message: 'Error mostrando los alumnos'});
    }
}

const updateAlumno = async (req, res) => {
    const {id, nombre, edad, email} = req.body;

    if(!id || !nombre || !edad || !email) return res.status(401).json({message: 'Error debe ingresar los datos del alumno'});

    try {
        const emailDuplicated = await Alumno.findOne({email: email});
        if(emailDuplicated) {
            return res.redirect('/')
        }

        const alumno = await Alumno.findByIdAndUpdate(id, {nombre: nombre, edad: edad, email:email});
        res.redirect('/');
    } catch (err) {
        console.log(err + 'error al mostrar los alumnos');
        return res.status(500).json({message: 'Error mostrando los alumnos'});
    }
}

const getAlumno = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ message: 'ID del alumno.' });
    
    try {
        const alumno = await Alumno.find({_id: req.params.id});
        if(!alumno) return res.status(204).json({message: 'No hay alumno con ese ID'});

        return res.status(200).json({alumno: alumno});
    } catch (err) {
        console.log(err + 'error al eliminar el alumno');
        return res.status(500).json({message: 'Error mostrando los alumnos'});
    }
}
module.exports = {
    getAllAlumnos,
    createAlumno,
    updateAlumno,
    deleteAlumno
}