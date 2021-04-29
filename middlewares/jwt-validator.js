const { response } = require("express");
const jwt = require("jsonwebtoken");

const jwtValidate = (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Falta token en la peticion",
    });
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      errors: "Token no valido",
    });
  }
  next();
};

module.exports = {
  jwtValidate,
};
