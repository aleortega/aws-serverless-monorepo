import { HTTP_STATUS_CODES } from 'commonConstants';

const AUTHENTICATION_ERRORS_DICTIONARY = {
  NotAuthorizedException: HTTP_STATUS_CODES.FORBIDDEN,
  InvalidParameterException: HTTP_STATUS_CODES.BAD_REQUEST,
  InvalidPasswordException: HTTP_STATUS_CODES.BAD_REQUEST,
  UsernameExistsException: HTTP_STATUS_CODES.CONFLICT,
  Unknown: HTTP_STATUS_CODES.UNKNOWN_ERROR
};

const serialize = (errorCode) => errorCode.replace('Exception', '');

export default (error) => {
  return {
    statusCode:
      AUTHENTICATION_ERRORS_DICTIONARY[error.code] ||
      AUTHENTICATION_ERRORS_DICTIONARY.Unknown,
    body: JSON.stringify({
      errorType: serialize(error.code),
      errorMessage: error.message
    })
  };
};
