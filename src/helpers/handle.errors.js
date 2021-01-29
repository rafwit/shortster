function handleError(error, _, response, next) {
  if (error.response) {
    response.status(error.response.data.statusCode).send({
      code: error.response.data.statusCode,
      message: error.response.data.message,
    });
  } else {
    next();
  }
}

function handleShortUrlNotFoundError(response) {
  response.status(404).send({
    code: 404,
    message: 'This shortURL does not exist in our database.',
  });
}

module.exports = { handleError, handleShortUrlNotFoundError };
