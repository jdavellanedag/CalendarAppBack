const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./config/dbConfig");

//Habilitar servidor de express
const app = express();

//Conexion a la base de datos
dbConnection();

//Habilitar cors
app.use(cors());

//Driectorio publico
app.use(express.static("public"));

//Habilitar lectura y parseo de JSON
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routes/auth"));

//Subir servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
