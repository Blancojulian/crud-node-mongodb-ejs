require('dotenv').config();
const db = require("./config/db.js");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;


app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use(require("./routes/alumnos.js"));



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})



