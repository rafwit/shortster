const shortster = require('../models/shortster');

const { generateUniqueShortcode } = require('../helpers/shortcode.generators');
const { searchForShortUrl } = require('../helpers/db.interactions');

async function saveUrl(req, res, next) {
  try {
    const { originUrl, customUrl } = req.body;

    let shortUrl = '';

    if (customUrl && (customUrl.length > 6 || customUrl.length < 4)) {
      res.status(400).send({
        code: 400,
        message: `CustomUrl length must be in range 4-6 inclusive, provided customUrl length is: ${customUrl.length}`,
      });
    }
    if (customUrl) shortUrl = customUrl;
    else shortUrl = await generateUniqueShortcode();

    const result = await shortster.create({
      origin: originUrl,
      origin_short: shortUrl,
      created_at: Date.now(),
      numbers_clicked: 0,
      last_clicked: 0,
    });

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
}

async function retrieveSavedUrlIfAvailable(req, res, next) {
  try {
    const result = await searchForShortUrl(req, res);
    await shortster.updateMany({
      $inc: { numbers_clicked: 1 },
      last_clicked: Date.now(),
    });

    res.status(200).send({ origin: result.origin });
  } catch (error) {
    next(error);
  }
}

async function serveStatsForShortUrl(req, res, next) {
  try {
    const result = await searchForShortUrl(req, res);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  saveUrl,
  retrieveSavedUrlIfAvailable,
  serveStatsForShortUrl,
};
