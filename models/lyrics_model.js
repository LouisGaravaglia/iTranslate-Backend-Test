const axios = require("axios");
const SEARCH_URL = "https://api.lyrics.ovh/v1";

class LyricsAPI {

  /**
  * Makes a call to the Lyrics API to see if they have the lyrics of the song
  * the user has selected.
  * @param {string} artist - artist name of the song you want lyrics for
  * @param {string} track - track name of the song you want lyrics for
  */
  static async getLyrics(artist, track) {
    try {
      const res = await axios({
        method: "get",
        url: `${SEARCH_URL}/${artist}/${track}`,
      });

      if (res.data.lyrics === "") {
        return "No Lyrics from API";
      } else {
        return res.data.lyrics;
      };
    } catch(e) {
      return "No Lyrics from API";
    };
  };
};

module.exports = LyricsAPI;