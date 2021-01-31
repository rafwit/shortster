const {
  generateUniqueShortcode,
} = require('../../helpers/shortcode.generators');

const db = require('../../models/index');
const shortster = require('../../models/shortster');

const mockUrlData = [
  { origin_short: '0dND55' },
  { origin_short: '0d4555' },
  { origin_short: 'ERND55' },
  { origin_short: '0poRr3' },
  { origin_short: 'xdNH55' },
  { origin_short: 'Tasdf3' },
];
const regexp = /[a-zA-Z0-9]+/g;

beforeAll(async () => {
  try {
    await db;
    await shortster.insertMany(mockUrlData);
  } catch (error) {
    throw new Error(error);
  }
});

describe('Shortcode generators - integration test', () => {
  test('Does not generate code that already exist in DB', async () => {
    const uniqueShort = await generateUniqueShortcode();
    const result = mockUrlData.filter((short) => short === uniqueShort);

    expect(result).toHaveLength(0);
  });

  test('Generate code that contains only uppercase and lowercase letters and numbers', async () => {
    const uniqueShort = await generateUniqueShortcode();
    const result = [...uniqueShort.matchAll(regexp)];
    expect(result[0][0]).toHaveLength(6);
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
