const router = require('express').Router();
const { saveUrl } = require('./controllers/shortser.controller');
const { handleError } = require('./middleware/handle.errors');

router.post('/', saveUrl);

router.post('*', handleError);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('*', handleError);

module.exports = router;
