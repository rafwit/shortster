const shortster = require('../models/shortster');

async function generateUniqueShortcode() {
  const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'.split(
    ''
  );
  const shortUrl = [];
  let i = 0;
  while (i < 6) {
    const randomChar = getRandomNumberInRange(0, chars.length);
    shortUrl.push(chars[randomChar]);
    i++;
  }

  const ShortUrlInUse = await validateIfShotUrlIsAvailable(shortUrl.join(''));

  if (ShortUrlInUse === null) return shortUrl.join('');
  generateUniqueShortcode();
}

function getRandomNumberInRange(min, max) {
  const result = Math.random() * (max - min) + min;
  return Math.floor(result);
}

async function validateIfShotUrlIsAvailable(url) {
  // if there is no matching document it will return null
  return await shortster.findOne({ origin_short: url }).exec();
}

module.exports = {
  generateUniqueShortcode,
  getRandomNumberInRange,
  validateIfShotUrlIsAvailable,
};
