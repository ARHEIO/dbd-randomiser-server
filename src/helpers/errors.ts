interface ErrorResponse {
  statusCode: number;
  body: string;
}

const createResponse = (statusCode: number, message: string, devMessage: string) => ({
  statusCode, body: JSON.stringify({ message, devMessage })
})

export class ApplicationError extends Error {
  errorCode: string;

  constructor(errorCode: string, message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.errorCode = errorCode;
  }
}

export const ErrorHandler = (applicationError: ApplicationError): ErrorResponse => {
  console.error(applicationError)
  console.error(applicationError.name)
  switch (applicationError.errorCode) {
    case 'NO_QUERY_PARAM':
      return createResponse(
        400,
        'There was no query param passed',
        applicationError.message
      )
    case 'BAD_QUERY_PARAM':
      return createResponse(
        400,
        'A unsupported query param was passed',
        applicationError.message
      )
    default:
      return createResponse(
        500,
        'Something went wrong',
        applicationError.message || 'Contact the devs on GitHub at https://github.com/ARHEIO/dbd-randomiser-server'
      )
  }
}