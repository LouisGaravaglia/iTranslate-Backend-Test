process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

const {
  afterEachHook,
  beforeEachHook,
  afterAllHook
} = require('./testing.config');

//ARTIST OBJECT TO USE IN POST ROUTE
const trackThree = {
    spotify_id: "test_track_id_3",
    name: "test_track_name_3",
    spotify_uri: "test_spotify_uri_3",
    album_id: "test_album_id_1",
    artist_id: "test_artist_id_1",
    preview_url: "test_preview_url_3"
};

beforeEach(async function() {
  await beforeEachHook();
});

describe('GET /translation', () => {

  it('("/translation") - gets translation if track has a transaltion with matching track id and language', async () => {
    const res = await request(app).get("/translation").query({track_id: 'test_track_id_1', selectedLanguage: 'es'});
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual('es mi traducción');
  });

  it('("/translation") - gets "No Translation in DB" if track has a transaltion but not with the selectedLanaguge', async () => {
    const res = await request(app).get("/translation").query({track_id: 'test_track_id_1', selectedLanguage: 'fr'});
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual("No Translation in DB");
  });
});

describe('POST /translation', () => {

  it('successfully adds an translation to the database.', async () => {
    const res = await request(app).post("/translation").send({track_id: 'test_track_id_2', translation: "This is my translation", language: 'en'});
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual({track_id: 'test_track_id_2'});
  });
});

afterEach(async function() {
  await afterEachHook();
});

afterAll(async function() {
  await afterAllHook();
});
