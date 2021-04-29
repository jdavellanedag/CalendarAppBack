const { response } = require("express");
const Event = require("../models/EventModel");

const getEventos = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");
  return res.json({
    ok: true,
    eventos: events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const eventDB = await event.save();

    res.status(201).json({
      ok: true,
      evento: eventDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contacte con el administrador",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos de editar el evento",
      });
    }
    const updatedEvent = { ...req.body, user: uid };
    const eventDB = await Event.findByIdAndUpdate(eventId, updatedEvent, {
      new: true,
    });

    res.json({
      ok: true,
      evento: eventDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contacte con el administrador",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos de eliminar el evento",
      });
    }

    await Event.findByIdAndRemove(eventId);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contacte con el administrador",
    });
  }
};

module.exports = {
  getEventos,
  createEvent,
  updateEvent,
  deleteEvent,
};
