const axios = require("axios");
const btoa = require('btoa');

//SPOTIFY USER VARIABLES
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ACCESS_TOKEN_URL = process.env.ACCESS_TOKEN_URL;

/**
 * Spotify requires user to encode their private client ids and then
 * once we send over that encoded data Spotify will return an acess token
 * which then needs to be incldued in the header to any Spotify API requrest.
 */
async function requestAccessToken() {

/**
 * Function to get base64 encoded data from private spotify values.
 * @param {string} clientID - private spotify client id
 * @param {string} secret - private spotify secret key
 */
  async function getEncodedKey(clientID, secret) {
    const encodedVal = btoa(clientID + ":" + secret);
    return encodedVal;
  };

  const key = await getEncodedKey(CLIENT_ID, CLIENT_SECRET)
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${key}`
    }
  };
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  const {data} = await axios.post(ACCESS_TOKEN_URL, params, config);
  return data.access_token;
};

module.exports = requestAccessToken;