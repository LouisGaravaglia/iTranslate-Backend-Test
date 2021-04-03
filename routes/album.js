const express = require("express");
const router = express.Router();
const {validate} = require("jsonschema");
const addAlbumSchema = require("../schemas/addAlbumSchema.json");
const Albums = require("../models/albums_model");
const ExpressError = require("../helpers/expressError");

//ALBUM GET ROUTE
router.get("/", async function(req, res, next) {
  try {
    const response = await Albums.getAlbums(req.query.artistId);
    return res.status( 201 ).json({response});
  } catch(e) {
    next(e);
  };
});

router.post("/", async function(req, res, next) {
  try {
    const validation = validate(req.body, addAlbumSchema);

    if (!validation.valid) {
      throw new ExpressError(validation.errors.map(e => e.stack), 400);
    };

    const response = await Albums.add(req.body);
    return res.status(201).json({response});
  } catch(e) {
    next(e);
  };
});

module.exports = router;