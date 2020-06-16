import { APIGatewayProxyEventBase } from "aws-lambda";

const defaultRequestBody: APIGatewayProxyEventBase<any> = {
  body: null,
  headers: {},
  multiValueHeaders: {},
  httpMethod: "GET",
  isBase64Encoded: false,
  path: '/dbd-randomiser',
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {} as any,
  resource: "",
}

export default defaultRequestBody;