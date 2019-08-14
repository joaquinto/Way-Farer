class ResponseHelper {
  static responseError(res, statusCode, errorMessage) {
    return res.status(statusCode).json({ status: 'error', error: errorMessage });
  }

  static responseSuccess(res, statusCode, successResponse) {
    return res.status(statusCode).json({ status: 'success', data: successResponse });
  }
}

export default ResponseHelper;
