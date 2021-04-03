process.env.NODE_ENV = "test";
const db = require('../db');

/**
 * Hooks to insert an artist, album, track and translations
 */
async function beforeEachHook() {
  try {

    //ADD FIRST ARTIST
    await db.query (
      `INSERT INTO artists ( spotify_id, name, genre, spotify_uri, img_url, popularity )
      VALUES ( 'test_artist_id_1', 'test_artist_name_1', 'rock, folk', 'test_spotify_uri_1', 'test_img_url_1', 45 ) RETURNING spotify_id`
    );

    //ADD FIRST ALBUM
    await db.query (
      `INSERT INTO albums ( spotify_id, name, release_date, spotify_uri, img_url, artist_id)
      VALUES ( 'test_album_id_1', 'test_album_name_1', 'test_release_date_1', 'test_spotify_uri_1', 'test_img_url_1', 'test_artist_id_1') RETURNING spotify_id`
    );

    //ADD FIRST TRACK
    await db.query (
      `INSERT INTO tracks ( spotify_id, name, explicit, popularity, preview_url, spotify_uri, danceability, tempo, valence, duration, artist_id, album_id)
      VALUES ( 'test_track_id_1', 'test_track_name_1', false, 82, 'test_preview_url_1', 'test_spotify_uri_1', 0.86, 1.55, 0.33, 24456, 'test_artist_id_1', 'test_album_id_1') RETURNING spotify_id`
    );

    //ADD SECOND ARTIST
    await db.query (
      `INSERT INTO artists ( spotify_id, name, genre, spotify_uri, img_url, popularity )
      VALUES ( 'test_artist_id_2', 'test_artist_name_2', 'rap, r&b', 'test_spotify_uri_2', 'test_img_url_2', 45 ) RETURNING spotify_id`
    );

    //ADD SECOND ALBUM
    await db.query (
      `INSERT INTO albums ( spotify_id, name, release_date, spotify_uri, img_url, artist_id)
      VALUES ( 'test_album_id_2', 'test_album_name_2', 'test_release_date_2', 'test_spotify_uri_2', 'test_img_url_2', 'test_artist_id_2') RETURNING spotify_id`
    );

    //ADD SECOND TRACK
    await db.query (
      `INSERT INTO tracks ( spotify_id, name, explicit, popularity, preview_url, spotify_uri, danceability, tempo, valence, duration, artist_id, album_id)
      VALUES ( 'test_track_id_2', 'test_track_name_2', false, 82, 'test_preview_url_2', 'test_spotify_uri_2', 0.98, 2.55, 0.44, 34456, 'test_artist_id_2', 'test_album_id_2') RETURNING spotify_id`
    );

    //ADD LYRICS TO FIRST TRACK
    await db.query (
      `UPDATE tracks SET lyrics = 'test_lyrics_1' WHERE spotify_id = 'test_track_id_1'`
    );

    //ADD NO LYRICS TO SECOND TRACK
    await db.query (
      `UPDATE tracks SET lyrics = 'No Lyrics' WHERE spotify_id = 'test_track_id_2'`
    );

    //ADD TRANSLATION TO THE FIRST TRACK
    await db.query (
      `INSERT INTO translation (track_id, translation, language)
      VALUES ('test_track_id_1', 'es mi traducción', 'es')`
    );

  } catch (error) {
    console.error(error);
  };
};

async function afterEachHook() {
  try {
    await db.query('DELETE FROM artists');
    await db.query('DELETE FROM albums');
    await db.query('DELETE FROM tracks');
  } catch(e) {
    console.error(e);
  };
};

async function afterAllHook() {
  try {
    await db.end();
  } catch(e) {
    console.error(e);
  };
};

module.exports = {
  afterAllHook,
  afterEachHook,
  beforeEachHook
};
