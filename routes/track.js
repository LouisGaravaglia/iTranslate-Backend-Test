const express = require("express");
const router = express.Router();
const {validate} = require("jsonschema");
const addTrackSchema = require("../schemas/addTrackSchema.json");
const Tracks = require("../models/tracks_model");
const ExpressError = require("../helpers/expressError");

router.get("/:handle", async function(req, res, next) {
  try {

    //GETS ALL TRACKS THAT FALL INTO THAT DANCEABILITY SCORE RANGE PROVIDED.
    if (req.params.handle === "danceability") {
      const response = await Tracks.getDanceabilityTracks(req.query);
      return res.status(201).json({response});
    //GETS ALL TRACKS FROM AN ALBUM
    } else if (req.params.handle === "getTracks") {
      const response = await Tracks.getTracks(req.query.albumId);
      return res.status(201).json({response});
    //GETS LYRICS FROM A TRACK
    } else if (req.params.handle === "getLyrics") {
      const response = await Tracks.getLyrics(req.query.trackId);
      return res.status(201).json({response});
    //CHECKS TO SEE IF TRACK HAS LYRICS, IF SO, RETURNS TRUE
    } else if (req.params.handle === "hasLyrics") {
      const response = await Tracks.checkIfTrackHasLyrics(req.query.trackId);
      return res.status(201).json({response});
    //CHECKS TO SEE IF TRACK IS IN DATABASE, IF SO, RETURNS TRUE
    } else if (req.params.handle === "inDatabase") {
      const response = await Tracks.checkIfTrackIsInDB(req.query.trackId);
      return res.status(201).json({response});
    };
  } catch(e) {
    return next(e);
  };
});

router.post( "/", async function(req, res, next) {
  try {
    const validation = validate(req.body, addTrackSchema);

    if (!validation.valid) {
      throw new ExpressError(validation.errors.map(e => e.stack), 400);
    };

    const response = await Tracks.addTrackData(req.body);
    return res.status(201).json({response});
  } catch(e) {
    return next(e);
  };
});

router.patch("/", async function(req, res, next) {
  try {
    const response = await Tracks.addLyrics(req.body);
    return res.status(201).json({response});
  } catch(e) {
    return next(e);
  };
});

module.exports = router;