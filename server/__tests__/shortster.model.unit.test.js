const db = require('../models/index');
const shortster = require('../models/shortster');

let testShortUrlOne;
let testShortUrlTwo;
let testUrlOneRetrieveDate;
let testUrlTwoRetrieveDate;

const mockUrlData = [
  {
    origin: 'www.google.pl',
    origin_short: 'lJ8xcx',
    created_at: '2021-01-29T12:08:39.317Z',
    numbers_clicked: 0,
    last_clicked: 0,
  },
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
    await shortster.create(mockUrlData[1]);

    await shortster.updateMany(
      { numbers_clicked: 0 },
      { $inc: { numbers_clicked: 3 } }
    );

    testUrlOneRetrieveDate = Date.now();
    await shortster.updateOne(
      { origin_short: 'lJ8xcx' },
      { last_clicked: testUrlOneRetrieveDate }
    );

    testUrlTwoRetrieveDate = Date.now();
    await shortster.updateOne(
      { origin_short: '0dND55' },
      { last_clicked: testUrlTwoRetrieveDate }
    );

    testShortUrlOne = await shortster
      .findOne({ origin_short: 'lJ8xcx' })
      .exec();
    testShortUrlTwo = await shortster
      .findOne({ origin_short: '0dND55' })
      .exec();
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
describe('Models - unit tests', () => {
  describe('Documents are created correctly', () => {
    test('Are not to be exact the same', () => {
      expect.assertions(1);
      expect(testShortUrlOne).not.toBe(testShortUrlTwo);
    });

    test('All contain correct value of "origin"', () => {
      expect.assertions(4);
      expect(testShortUrlOne.origin).toBeDefined();
      expect(testShortUrlOne.origin).toBe('www.google.pl');
      expect(testShortUrlTwo.origin).toBeDefined();
      expect(testShortUrlTwo.origin).toBe('www.movingworlds.org');
    });
    test('All contain correct value of "origin_short"', () => {
      expect.assertions(4);
      expect(testShortUrlOne.origin_short).toBeDefined();
      expect(testShortUrlOne.origin_short).toBe('lJ8xcx');
      expect(testShortUrlTwo.origin_short).toBeDefined();
      expect(testShortUrlTwo.origin_short).toBe('0dND55');
    });
  });

  describe('Documents are updated correctly', () => {
    test('All contain correct value of "numbers_clicked" after update', () => {
      expect.assertions(2);
      expect(testShortUrlOne.numbers_clicked).toBe(3);
      expect(testShortUrlTwo.numbers_clicked).toBe(3);
    });
    test('All contain correct value of "last_clicked" after update', () => {
      expect.assertions(2);
      expect(testShortUrlOne.last_clicked).toBe(testUrlOneRetrieveDate);
      expect(testShortUrlTwo.last_clicked).toBe(testUrlTwoRetrieveDate);
    });
  });
});
