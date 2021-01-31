const {
  validateIfShotUrlIsAvailable,
} = require('../../helpers/shortcode.generators');

const db = require('../../models/index');
const shortster = require('../../models/shortster');

const mockUrlData = [
  {
    origin: 'www.movingworlds.org',
    origin_short: '0d4F55',
    created_at: '2021-01-29T12:08:39.317Z',
    numbers_clicked: 0,
    last_clicked: 0,
  },
];

beforeAll(async () => {
  try {
    await db;
    await shortster.create(mockUrlData[0]);
  } catch (error) {
    throw new Error(error);
  }
});

describe('validateIfShotUrlIsAvailable - unit test', () => {
  test('Returns null if Url is available', async () => {
    const result = await validateIfShotUrlIsAvailable('WEIRD');
    expect.assertions(1);
    expect(result).toBeNull();
  });

  test('Returns value !== null if Url is not available', async () => {
    const result = await validateIfShotUrlIsAvailable(
      mockUrlData[0].origin_short
    );
    expect.assertions(1);
    expect(result).not.toBeNull();
  });
});

afterAll(async () => {
  try {
    await db.connection.dropCollection('shortsters');
    await db.connection.close();
  } catch (error) {
    throw new Error(error);
  }
});
