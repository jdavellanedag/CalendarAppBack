const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Conexion a DB OK");
  } catch (error) {
    console.log(error);
    throw new Error("Error iniciando base de datos");
  }
};

module.exports = {
  dbConnection,
};
