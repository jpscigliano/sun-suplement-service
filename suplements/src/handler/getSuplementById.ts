import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import middy from '@middy/core';
import ResponseHandler from '../dto/common/response-handler';
import { SuplementRepositoryImpl } from '../repository/suplement.repository';
/**
 *
 * NOT USED. Check GetSuplement()
 *
 */

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const suplement = await new SuplementRepositoryImpl().GetSuplementById(event.pathParameters?.id!);
        return ResponseHandler.success(suplement);
    } catch (err) {
        return ResponseHandler.error(err);
    }
};

export const lambdaHandler = middy(handler);
