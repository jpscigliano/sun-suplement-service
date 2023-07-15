
import { DynamoDBClient, ScanCommand, ListTablesCommand, GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";


export class NutrientRepositoryImpl {

    private dbClient: DynamoDBClient = new DynamoDBClient({ region: "eu-central-1" });
    private dbTable = process.env.SUN_TABLE


    constructor() {

    }


    public async GetNutrients() {

        const params = {
            TableName: this.dbTable,
            KeyConditionExpression: "Pk = :pk",
            ExpressionAttributeValues: {
                ":pk": { S: "NUT" },
            },
        };
        const command = new QueryCommand(params);
        const { Items } = await this.dbClient.send(command);

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

    }

}
