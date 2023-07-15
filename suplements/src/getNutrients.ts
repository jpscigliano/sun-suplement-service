import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, ScanCommand, ListTablesCommand, GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";


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
        const params = {
            TableName: process.env.SUN_TABLE,
            KeyConditionExpression: "Pk = :pk",
            ExpressionAttributeValues: {
                ":pk": { S: "NUT" },
            },
        };

        const command = new QueryCommand(params);
        const { Items } = await dbClient.send(command);

        const nutrients = Items.map((dynamoItem: any) => {
            const item = unmarshall(dynamoItem);
            const { NutrientType = '', Sk = '', NutrientGenericName = '', NutrientUnits = [] } = item;
            
            const nutrient: Nutrient = {
                type: NutrientType,
                chemicalName: Sk.replace("NUT#", ""),
                genericName: NutrientGenericName,
                units: NutrientUnits
            };
            return nutrient;
        });

        return {
            statusCode: 200,
            body: JSON.stringify(nutrients),
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

