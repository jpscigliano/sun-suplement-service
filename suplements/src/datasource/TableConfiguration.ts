import { DynamoDBClient, ScanCommand, ListTablesCommand, GetItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { Table, Entity } from 'dynamodb-toolbox';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // if not false explicitly, we set it to true.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    // NOTE: this is required to be true in order to use the bigint data type.
    wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

//Set Dynamo
const dbClient: DynamoDBClient = new DynamoDBClient({ region: 'eu-central-1' });
const dbTable = process.env.SUN_TABLE!;

// Instantiate a DocumentClient
const DocumentClient = DynamoDBDocumentClient.from(dbClient, translateConfig);

// Instantiate a table
export const SunTable = new Table({
    name: dbTable,
    partitionKey: 'Pk',
    sortKey: 'Sk',
    DocumentClient,
    indexes: {
        ItemTypeIndex: { partitionKey: 'ItemType' },
    },
});
