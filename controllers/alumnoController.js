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
  
    if(!nombre || !edad || !email) {
        return res.status(401).json({message: 'Error debe ingresar nombre y edad'});
    }

    try {
        const emailDuplicated = await Alumno.findOne({email: email});
        if(emailDuplicated) {
            return res.status(409).json({message: `El email ${emailDuplicated.email} ya se encuentra en uso`});
        }

        const alumno = await Alumno.create({nombre: nombre, edad: edad, email: email});
        res.status(200).json({message: 'Alumno creado'});
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
        res.status(200).json({message: 'Alumno eliminado'});
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
        const alumno2 = await Alumno.findOne({_id: id});
        console.log(alumno2._id);
        console.log(emailDuplicated._id);
        console.log(emailDuplicated);

        if(emailDuplicated && alumno2._id.toString() != emailDuplicated._id.toString()) {
            return res.status(409).json({message: `El email ${emailDuplicated.email} ya se encuentra en uso`});
        }

        const alumno = await Alumno.findByIdAndUpdate(id, {nombre: nombre, edad: edad, email:email});
        
        res.status(200).json({message: 'Alumno modificado'});
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