process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

const {
  afterEachHook,
  beforeEachHook,
  afterAllHook
} = require('./testing.config');

const artistThree = {
  spotify_id: "test_artist_id_3",
  name: "test_artist_name_3",
  genre: "test_genre_3",
  spotify_uri: "test_spotify_uri_3",
  img_url: "test_img_url_3",
  popularity: 99
};

//ALBUM OBJECT TO USE IN POST AND DELETE ROUTES
const albumThree = {
  spotify_id: 'test_album_id_3',
  name: 'test_album_name_3',
  release_date: 'test_release_date_3',
  spotify_uri: 'test_spotify_uri_3',
  img_url: 'test_img_url_3',
  artist_id: 'test_artist_id_3'
};

beforeEach(async function() {
  await beforeEachHook();
});

describe('GET /album', () => {

  it('gets back albums array of artist with matching id, and that contains songs in DB that have lyrics.', async () => {
    const res = await request(app).get("/album").query({artistId: 'test_artist_id_1'});
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual([{albumId:'test_album_id_1', albumImg:'test_img_url_1', albumName:'test_album_name_1', release_date:'test_release_date_1'}]);
  });
});

describe('POST /album', () => {

  it('successfully adds an album to the database.', async () => {
    await request(app).post("/artist").send(artistThree);
    const res = await request(app).post("/album").send(albumThree);
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual('test_album_id_3');
  });
});

afterEach(async function() {
  await afterEachHook();
});

afterAll(async function() {
  await afterAllHook();
});
