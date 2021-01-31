const request = require('supertest');
const app = require('../..');
const db = require('../../models/index');
const shortster = require('../../models/shortster');

const mockUrlData = [
  {
    origin: 'www.movingworlds.org',
    origin_short: '0dND55',
    created_at: '2021-01-29T12:08:39.317Z',
    numbers_clicked: 0,
    last_clicked: 0,
  },
];

beforeAll(async () => {
  try {
    await db;
    await shortster.create(mockUrlData[0]);
    await shortster.updateMany(
      { numbers_clicked: 0 },
      { $inc: { numbers_clicked: 3 } }
    );
  } catch (error) {
    throw new Error(error);
  }
});

afterAll(async () => {
  try {
    await db.connection.dropCollection('shortsters');
    await db.connection.close();
  } catch (error) {
    throw new Error(error);
  }
});

// calling the test database populated with mocked data during beforeAll hook

describe('Controllers and Models - integration tests', () => {
  describe('Controllers work with models', () => {
    test('GET /:shortUrl - success', () => {
      expect.assertions(2);
      return request(app)
        .get('/0dND55')
        .expect(200)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.text).toBe('www.movingworlds.org');
        });
    });

    test('GET /:shortUrl - failure', () => {
      expect.assertions(2);
      return request(app)
        .get('/WEIRD')
        .expect(404)
        .then((response) => {
          expect(response.statusCode).toBe(404);
          expect(response.error.text).toBe(
            '{"code":404,"message":"This shortURL does not exist in our database."}'
          );
        });
    });

    test('GET /:shortUrl/stats - success', () => {
      expect.assertions(3);
      return request(app)
        .get('/0dND55/stats')
        .expect(200)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(Object.keys(response.body)).toHaveLength(6);
          expect(response.body.origin).toBe('www.movingworlds.org');
        });
    });

    test('GET /:shortUrl/stats - failure', () => {
      expect.assertions(2);
      return request(app)
        .get('/WEIRD/stats')
        .expect(404)
        .then((response) => {
          expect(response.statusCode).toBe(404);
          expect(response.error.text).toBe(
            '{"code":404,"message":"This shortURL does not exist in our database."}'
          );
        });
    });
  });
});
