const shortster = require('../models/shortster');

const { generateUniqueShortcode } = require('../helpers/functions');

async function saveUrl(req, res, next) {
  try {
    const { originUrl, customUrl, createdAt } = req.body;

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
      created_at: createdAt,
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
    const { shortUrl } = req.params;

    const result = await shortster.findOne({ origin_short: shortUrl }).exec();

    if (result === null) {
      res.status(404).send({
        code: 404,
        message: 'This shortURL does not exist in our database.',
      });
    }

    res.status(200).send(result.origin);
  } catch (error) {
    next(error);
  }
}

module.exports = { saveUrl, retrieveSavedUrlIfAvailable };
