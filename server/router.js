const router = require('express').Router();
const {
  saveUrl,
  retrieveSavedUrlIfAvailable,
  serveStatsForShortUrl,
} = require('./controllers/shortser.controller');
const { handleErrorGeneric } = require('./helpers/handle.errors');

router.post('/', saveUrl);

router.post('*', handleErrorGeneric);

router.get('/:shortUrl', retrieveSavedUrlIfAvailable);
router.get('/:shortUrl/stats', serveStatsForShortUrl);

router.get('*', handleErrorGeneric);
router.get('*', (req, res) => {
  res.status(404).send("We're sorry, the requested route was not found");
});

module.exports = router;
