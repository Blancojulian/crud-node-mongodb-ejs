const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alumnoSchema = new Schema ({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {versionKey: false});

module.exports = mongoose.model("alumnos", alumnoSchema);