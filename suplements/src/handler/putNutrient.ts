import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { NutrientRepositoryImpl } from '../repository/nutrient.repository';
import ResponseHandler from '../dto/common/response-handler';
import { NutrientDto } from '../dto/nutrientDto';
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
        const newNutrient = await new NutrientRepositoryImpl().PutNutrient(body);
        return ResponseHandler.success(newNutrient);
    } catch (err) {
        return ResponseHandler.error(err);
    }
};

export const lambdaHandler = middy(handler).use(
    ClassValidatorMiddleware.create({
        classType: NutrientDto,
    }),
);
