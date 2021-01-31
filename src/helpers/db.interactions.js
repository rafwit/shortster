const shortster = require('../models/shortster');

const { handleShortUrlNotFoundError } = require('./handle.errors');

async function searchForShortUrl(request, response) {
  const { shortUrl } = request.params;
  const result = await shortster.findOne({ origin_short: shortUrl }).exec();

  if (result === null) handleShortUrlNotFoundError(response);
  else return result;
}

module.exports = { searchForShortUrl };
