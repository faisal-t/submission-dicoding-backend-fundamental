const { serverErrorHandler } = require('../../utils/handler');

class ExportsHandler {
  constructor(service, playlistService, validator) {
    this._service = service;
    this._playlistService = playlistService;
    this._validator = validator;

    this.postExportPlaylistHandler = this.postExportPlaylistHandler.bind(this);
  }

  async postExportPlaylistHandler(request, h) {
    try {
      this._validator.validateExportPlaylistPayload(request.payload);

      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;
      await this._playlistService.verifyPlaylistOwner(playlistId, credentialId);

      const message = {
        userId: request.auth.credentials.id,
        targetEmail: request.payload.targetEmail,
      };

      await this._service.sendMessage('export:playlist', JSON.stringify(message));

      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda sedang kami proses',
      });
      response.code(201);
      return response;
    } catch (error) {
      return serverErrorHandler(error, h);
    }
  }
}

module.exports = ExportsHandler;
