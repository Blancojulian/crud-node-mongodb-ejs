const mongoose = require("mongoose");
const url = process.env.DB_URI;

mongoose.connect(url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error al conectar a MongoDB"));
db.once("open", function callback() {
    console.log("Conectado a MongoDB")
});

module.exports = db;