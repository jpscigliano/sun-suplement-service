import { APIGatewayProxyResult } from 'aws-lambda';
import { ErrorDto } from './error.dto';
import { ErrorCode } from '../../error/errorCodes';

export default class ResponseHandler {
    static success(payload): APIGatewayProxyResult {
        return {
            statusCode: 200,
            body: JSON.stringify(payload),
        };
    }

    static error(error): APIGatewayProxyResult {
        console.log(error);

        if (error && [400, 401, 403, 404, 409, 429].includes(error.httpCode)) {
            const response: ErrorDto = {
                code: error.code,
                message: error.message,
            };
            return {
                statusCode: error.httpCode,
                body: JSON.stringify(response),
            };
        } else {
            const response: ErrorDto = {
                code: ErrorCode.General_InternalServerError,
                message: error.message,
            };
            return {
                statusCode: 500,
                body: JSON.stringify(response),
            };
        }
    }
}
