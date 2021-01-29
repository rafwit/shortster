function handleError(error, _, response, next) {
  if (error.response) {
    response.status(error.response.data.statusCode).send({
      code: error.response.data.statusCode,
      message: error.response.data.message,
    });
  } else {
    response.status(500).send('Something went wrong');
  }
}

module.exports = { handleError };
