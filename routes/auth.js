/* 
    Rutas de usuarios / Auth
    host + /api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const {
  loginUser,
  createUser,
  renewToken,
} = require("../controllers/authController");
const { fieldValidate } = require("../middlewares/field-validator");
const { jwtValidate } = require("../middlewares/jwt-validator");

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidate,
  ],
  loginUser
);

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidate,
  ],
  createUser
);

router.get("/renew", jwtValidate, renewToken);

module.exports = router;
