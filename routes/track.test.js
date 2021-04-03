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

describe('GET /track', () => {

  it('("/track/danceability") - gets back array of tracks where the danceability score falls in range.', async () => {
    const res = await request(app).get("/track/danceability").query({lowerLimit: 0.85, upperLimit: 0.87});
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual([{trackName:'test_track_name_1', trackId:'test_track_id_1', albumName: 'test_album_name_1', albumId: 'test_album_id_1', artistId: 'test_artist_id_1', artistName: 'test_artist_name_1'}]);
  });

  it('("/track/getTracks") - gets back array of tracks from the given albumId that is passed that have lyrics.', async () => {
    const res = await request(app).get("/track/getTracks").query({albumId: 'test_album_id_1'});
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual([{trackName:'test_track_name_1', trackId:'test_track_id_1', albumId: 'test_album_id_1', artistId: 'test_artist_id_1', artistName: 'test_artist_name_1'}]);
  });

  it('("/track/getTracks") - gets back an empty array with an albumId who has no tracks with lyrics', async () => {
    const noLyricsResponse = await request(app).get("/track/getTracks").query({albumId: 'test_album_id_2'});
    expect(noLyricsResponse.statusCode).toBe(201);
    expect(noLyricsResponse.body.response).toEqual([]);
  });

  it('("/track/getLyrics") - gets back lyrics from trackId sent.', async () => {
    const res = await request(app).get("/track/getLyrics").query({trackId: 'test_track_id_1'});
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual('test_lyrics_1');
  });

  it('("/track/hasLyrics") - gets back boolean of true when track has lyrics', async () => {
    const res = await request(app).get("/track/hasLyrics").query({trackId: 'test_track_id_1'});
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual(true);
  });

  it('("/track/hasLyrics") - gets back boolean of false when track does not contain lyrics', async () => {
    const res = await request(app).get("/track/hasLyrics").query({trackId: 'test_track_id_2'});
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual(false);
  });

  it('("/track/inDatabase") - gets back boolean of true when track is in database', async () => {
    const res = await request(app).get("/track/inDatabase").query({trackId: 'test_track_id_1'});
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual(true);
  });

  it('("/track/inDatabase") - gets back boolean of false when track is not in database', async () => {
    const res = await request(app).get("/track/inDatabase").query({trackId: 'not_valid_id_54'});
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual(false);
  });
});

describe('POST /track', () => {

  it('successfully adds an track to the database.', async () => {
    const res = await request(app).post("/track").send(trackThree);
    expect(res.statusCode).toBe(201);
    expect(res.body.response).toEqual('test_track_id_3');
  });
});

describe('PATCH /track', () => {

  it('adds lyrics to an existing track.', async () => {
    const res = await request(app).patch("/track").send({track_id: 'test_track_id_2', lyrics: "I have lyrics"});
    expect(res.statusCode).toBe(201);
    const updatedTrackRes = await request(app).get("/track/getLyrics").query({trackId: 'test_track_id_2'});
    expect(updatedTrackRes.statusCode).toBe(201);
    expect(updatedTrackRes.body.response).toEqual('I have lyrics');
  });
});

afterEach(async function() {
  await afterEachHook();
});

afterAll(async function() {
  await afterAllHook();
});
