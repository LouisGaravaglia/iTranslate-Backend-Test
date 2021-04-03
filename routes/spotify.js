const express = require("express");
const router = express.Router();
const Spotify = require('../models/spotify_model');

router.get("/:handle", async function(req, res, next) {
  try {
    if (req.params.handle === "requestSearch") {
      const response = await Spotify.requestSearch(req.query.search);
      return res.status(201).json({response});
    } else if (req.params.handle === "getTrackArtistAlbumData") {
      const response = await Spotify.getTrackArtistAlbumData(req.query);
      return res.status(201).json({response});
    };
  } catch(e) {
    return next(e);
  };
});

module.exports = router;