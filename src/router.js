const router = require('express').Router();
const {
  saveUrl,
  retrieveSavedUrlIfAvailable,
} = require('./controllers/shortser.controller');
const { handleError } = require('./middleware/handle.errors');

router.post('/', saveUrl);

router.post('*', handleError);

router.get('/:shortUrl', retrieveSavedUrlIfAvailable);

router.get('*', handleError);

module.exports = router;
