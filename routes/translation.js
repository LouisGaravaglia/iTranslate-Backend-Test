const express = require("express");
const router = express.Router();
const Translation = require('../models/translation_model');

//TRANSLATION GET ROUTE
router.get("/", async function(req, res, next) {
  try {
    const response = await Translation.get(req.query);
    return res.status(201).json({response});
  } catch(e) {
    return next(e);
  };
});

router.post("/", async function(req, res, next) {
  try {
    const response = await Translation.add(req.body);
    return res.status(201).json({response});
  } catch(e) {
    return next(e);
  };
});

module.exports = router;