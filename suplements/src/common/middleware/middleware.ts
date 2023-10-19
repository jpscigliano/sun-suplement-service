import middy from '@middy/core';
import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ErrorDto } from '../../dto/common/error.dto';
import { ErrorCode } from '../../error/errorCodes';

export const myMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => ({
    before: async (request) => {
        console.log('----->  PUT SUPLEMENT - MIDDLEWARE AS CONST BEFOREEEE <------');
    },
});
