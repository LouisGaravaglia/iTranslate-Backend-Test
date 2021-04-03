const express = require("express");
const router = express.Router();
const dotevn = require("dotenv");
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const {IamAuthenticator} = require('ibm-watson/auth');
const IBM_API_KEY = process.env.IBM_API_KEY;
const IBM_URL  = process.env.IBM_URL;
const IBM_VERSION = process.env.IBM_VERSION;

const languageTranslator = new LanguageTranslatorV3({
  version: IBM_VERSION,
  authenticator: new IamAuthenticator({
    apikey: IBM_API_KEY,
  }),
  serviceUrl: IBM_URL,
});

router.get("/:handle", async function(req, res, next) {
  try {

    //GETS AN OBJECT OF TRANSLATED TEXT WHEN PROVIDED SOURCE TEXT AND TARGET LANGUAGE.
    if (req.params.handle === "translate") {
      const lyrics = req.query.lyrics;
      const language = req.query.language;

      const translateParams = {
        text: lyrics,
        target: language,
      };

      //NOT PROVIDING SOURCE LANGUAGE, SO IT CAN FAIL IF IT CAN NOT FIGURE OUT WHAT LANGUAGE THE SOURCE TEXT IS
      const response =  await languageTranslator.translate(translateParams);
      return res.json(JSON.stringify({response: response.result.translations[0].translation}));

    } else {
      //GETS AN ARRAY OF AVAILABLIE LANGUAGES IBM CAN TRANSLATE TO
      const response =  await languageTranslator.listLanguages();
      return res.json(JSON.stringify({response}));
    };
  }
  catch (e) {
    return next(e);
  };
});

module.exports = router;