import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SuplementRepositoryImpl } from '../repository/suplement.repository';
import ResponseHandler from '../dto/common/response-handler';
import { SuplementDto } from '../dto/suplementDto';
import middy from '@middy/core';
import { ClassValidatorMiddleware } from '../common/middleware/validatorMiddleware';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const body = JSON.parse(event.body!);
        const putSuplement = await new SuplementRepositoryImpl().PutSuplement(body);
        return ResponseHandler.success(putSuplement);
    } catch (err) {
        return ResponseHandler.error(err);
    }
};

export const lambdaHandler = middy(handler).use(
    ClassValidatorMiddleware.create({
        classType: SuplementDto,
    }),
);
