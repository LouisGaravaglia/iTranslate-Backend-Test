const db = require("../db");

class Albums {

  static async add (data) {
    const duplicateCheck = await db.query (
      `SELECT spotify_id FROM albums WHERE spotify_id = $1`, [data.spotify_id]
    );

    if (duplicateCheck.rows.length) {
      return data.spotify_id;
    };

    const result = await db.query (
      `INSERT INTO albums ( spotify_id, name, release_date, spotify_uri, img_url, artist_id)
      VALUES ( $1, $2, $3, $4, $5, $6) RETURNING spotify_id`, 
      [data.spotify_id, data.name, data.release_date, data.spotify_uri, data.img_url, data.artist_id]
    );
    return result.rows[0].spotify_id;
  };

  static async getAlbums(artistId) {
    const result = await db.query (
      `SELECT d.spotify_id AS "albumId", d.img_url AS "albumImg", d.name AS "albumName", d.release_date
       FROM albums d 
       JOIN tracks t ON d.spotify_id = t.album_id 
       WHERE d.artist_id = $1 AND t.lyrics != 'No Lyrics'
       GROUP BY d.spotify_id, d.img_url, d.name, d.release_date
       ORDER BY d.release_date DESC`, [artistId]);
    return result.rows;
  };
};

module.exports = Albums;