const express = require("express");
const router = express.Router();
const LyricsAPI = require('../models/lyrics_model');

router.get("/", async function(req, res, next) {
  try {
    const response = await LyricsAPI.getLyrics(req.query.artist, req.query.track);
    return res.status(201).json({response});
  } catch(e) {
    return next(e);
  };
});

module.exports = router;