const {
  handleErrorGeneric,
  handleShortUrlNotFoundError,
} = require('../../helpers/handle.errors');

describe('Error handlers - unit tests', () => {
  const request = {};
  const response = {
    status: jest.fn(() => response).mockName('status'),
    send: jest.fn(() => response).mockName('send'),
  };
  const next = () => {};

  const error666 = {
    response: {
      data: {
        statusCode: 666,
        message: 'Watch out for the Devil!',
      },
    },
  };

  const error404 = {
    response: {
      data: {
        statusCode: 404,
        message: 'This shortURL does not exist in our database.',
      },
    },
  };

  describe('handleErrorGeneric - unit test', () => {
    test('Sends correct statusCode', () => {
      handleErrorGeneric(error666, request, response, next);

      expect.assertions(2);
      expect(response.status).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(
        error666.response.data.statusCode
      );
    });

    test('Sends correct response', () => {
      expect(response.send).toHaveBeenCalled();
      expect(response.send).toHaveBeenCalledWith({
        code: error666.response.data.statusCode,
        message: error666.response.data.message,
      });
    });
  });

  describe('handleShortUrlNotFoundError - unit test', () => {
    test('Sends correct statusCode', () => {
      handleShortUrlNotFoundError(response);

      expect.assertions(2);
      expect(response.status).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(
        error404.response.data.statusCode
      );
    });

    test('Sends correct response', () => {
      expect(response.send).toHaveBeenCalled();
      expect(response.send).toHaveBeenCalledWith({
        code: error404.response.data.statusCode,
        message: error404.response.data.message,
      });
    });
  });
});
