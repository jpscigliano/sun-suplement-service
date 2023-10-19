import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ResponseHandler from '../dto/common/response-handler';
import { SuplementRepositoryImpl } from '../repository/suplement.repository';
import middy from '@middy/core';

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
    const id = event.pathParameters?.id;
    try {
        if (id) {
            const suplement = await new SuplementRepositoryImpl().GetSuplementById(id);
            return ResponseHandler.success(suplement);
        } else {
            const suplements = await new SuplementRepositoryImpl().GetSuplements();
            return ResponseHandler.success(suplements);
        }
    } catch (err) {
        return ResponseHandler.error(err);
    }
};

export const lambdaHandler = middy(handler);
