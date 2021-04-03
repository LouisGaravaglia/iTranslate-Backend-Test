const db = require("../db");

class Artists {

  static async add (data) {
    const duplicateCheck = await db.query (
      `SELECT spotify_id FROM artists WHERE spotify_id = $1`, [data.spotify_id]
    );

    if (duplicateCheck.rows.length) {
      return data.spotify_id;
    };

    const result = await db.query (
      `INSERT INTO artists ( spotify_id, name, genre, spotify_uri, img_url, popularity )
      VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING spotify_id`, 
      [data.spotify_id, data.name, data.genre, data.spotify_uri, data.img_url, data.popularity]
    );
    return result.rows[0].spotify_id;
  };

  static async getArtistsAndIds() {
    const result = await db.query (`SELECT a.name AS "artistName", a.spotify_id AS "artistId"
      FROM artists a 
      JOIN tracks t ON a.spotify_id = t.artist_id
      WHERE t.lyrics != 'No Lyrics' GROUP BY a.spotify_id, a.name ORDER BY a.name`
    );
    return result.rows;
  };

  static async getGenres() {
    const result = await db.query (`SELECT array_to_string(ARRAY(
      SELECT a.genre 
      FROM artists a
      JOIN tracks t
      ON a.spotify_id = t.artist_id
      WHERE t.lyrics != 'No Lyrics'
      GROUP BY a.genre, a.name
      ), ', ') AS genres`
    );
    return result.rows;
  };

  static async getArtistByGenre(genre) {
    const result = await db.query (
      `SELECT a.name AS "artistName", a.spotify_id AS "artistId"
      FROM artists a
      JOIN tracks t
      ON a.spotify_id = t.artist_id
      WHERE a.genre ILIKE '%'||$1||'%' AND t.lyrics != 'No Lyrics'
      GROUP BY a.name, a.spotify_id`, [genre]
    );
    return result.rows;
  };
};

module.exports = Artists;