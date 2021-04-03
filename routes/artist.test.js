process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

const {
  afterEachHook,
  beforeEachHook,
  afterAllHook
} = require('./testing.config');

//ARTIST OBJECT TO USE IN POST AND DELETE ROUTES
const artistThree = {
  spotify_id: "test_artist_id_3",
  name: "test_artist_name_3",
  genre: "test_genre_3",
  spotify_uri: "test_spotify_uri_3",
  img_url: "test_img_url_3",
  popularity: 88
};

beforeEach(async function() {
  await beforeEachHook();
});

describe('GET /artist', () => {

  it('("/artist/ids") - gets back array of artist names and artist ids of artists who have lyrics in DB.', async () => {
    const res = await request(app).get("/artist/ids");
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual([{artistName:'test_artist_name_1', artistId:'test_artist_id_1'}]);
  });

  it('("/artist/allGenres") - gets back array of all genres of artists who have lyrics in DB.', async () => {
    const res = await request(app).get("/artist/allGenres");
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual([{genres: "rock, folk"}]);
  });

  it('("/artist/byGenre") - gets back array of all genres of artists who have lyrics in DB.', async () => {
    const res = await request(app).get("/artist/byGenre").query({genre: 'folk'});
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual([{artistName:'test_artist_name_1', artistId:'test_artist_id_1'}]);
  });

  it('("/artist/byGenre") - should not return any artists since the artist who has genre of rap has no tracks with lyrics.', async () => {
    const noLyricsGenreRes = await request(app).get("/artist/byGenre").query({genre: 'rap'});
    expect(noLyricsGenreRes.statusCode).toBe(201);
    expect(noLyricsGenreRes.body.response).toEqual([]);
  });
});

describe('POST /artist', () => {

  it('successfully adds an artist to the database.', async () => {
    const res = await request(app).post("/artist").send(artistThree);
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual('test_artist_id_3');
  });
});

afterEach(async function() {
  await afterEachHook();
});

afterAll(async function() {
  await afterAllHook();
});
