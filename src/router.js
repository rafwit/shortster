const router = require('express').Router();
const {
  saveUrl,
  retrieveSavedUrlIfAvailable,
  serveStatsForShortUrl,
} = require('./controllers/shortser.controller');
const { handleError } = require('./helpers/handle.errors');

router.post('/', saveUrl);

router.post('*', handleError);

router.get('/:shortUrl', retrieveSavedUrlIfAvailable);
router.get('/:shortUrl/stats', serveStatsForShortUrl);

router.get('*', handleError);
router.get('*', (req, res) => {
  res.status(404).send("We're sorry, the requested page was not found");
});

module.exports = router;
