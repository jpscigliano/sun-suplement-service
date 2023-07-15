import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, ScanCommand, ListTablesCommand, GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */


const dbClient = new DynamoDBClient({ region: "eu-central-1" });


export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {

        const body = JSON.parse(event.body);

        const nutrient: Nutrient = {
            type: body.type,
            chemicalName: body.chemicalName,
            genericName: body.genericName,
            units: body.units
        };


        const params = {
            TableName: process.env.SUN_TABLE,
            Item: {
                "Pk": "NUT",
                "Sk": "NUT#" + nutrient.chemicalName.toLocaleLowerCase(),
                "NutrientGenericName": nutrient.genericName,
                "NutrientUnits": nutrient.units,
                "NutrientType": nutrient.type
            },
        };

        const command = new PutCommand(params);
        const items = await dbClient.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: event.httpMethod + ' ' + event.path + " Request :  " + nutrient.chemicalName + " " + nutrient.genericName + " " + nutrient.units.toString(),
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened: ' + err,
            }),
        };
    }
};

