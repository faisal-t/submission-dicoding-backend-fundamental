const { serverErrorHandler } = require('../../utils/handler');

class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    try {
      const { data } = request.payload;
      this._validator.validateImageHeaders(data.hapi.headers);

      const pictureUrl = await this._service.writeFile(data, data.hapi);

      const response = h.response({
        status: 'success',
        message: 'Gambar berhasil diunggah',
        data: {
          pictureUrl: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${pictureUrl}`,
        },
      });
      response.code(201);
      return response;
    } catch (e) {
      return serverErrorHandler(e, h);
    }
  }
}

module.exports = UploadsHandler;
