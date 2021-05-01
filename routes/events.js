const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEventos,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { jwtValidate } = require("../middlewares/jwt-validator");
const { fieldValidate } = require("../middlewares/field-validator");
const { isDate } = require("../helpers/isDate");
const router = Router();

router.use(jwtValidate);

router.get("/", getEventos);

router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalizacion es obligatoria").custom(isDate),
    fieldValidate,
  ],
  createEvent
);

router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalizacion es obligatoria").custom(isDate),
  ],
  updateEvent
);

router.delete("/:id", deleteEvent);

module.exports = router;
