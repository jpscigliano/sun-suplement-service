import { Table, Entity } from 'dynamodb-toolbox';
import { TableDef } from 'dynamodb-toolbox/dist/classes/Table';
import { SunTable } from '../TableConfiguration';

const getNutrientEntityManager = (sunTable: TableDef) =>
    new Entity({
        // Specify entity name
        name: 'Nutrient',
        // Define attributes
        attributes: {
            Pk: { type: 'string', partitionKey: true, prefix: 'NUT' }, // flag as partitionKey
            Sk: { type: 'string', sortKey: true, prefix: 'NUT#' }, // flag as sortKey and mark hidden
            NutrientChemicalName: { type: 'string' },
            NutrientGenericName: { type: 'string' },
            NutrientType: { type: 'string' },
            NutrientUnits: { type: 'list' },
        },
        table: sunTable,
    } as const);
export const NutrientEntityManager = getNutrientEntityManager(SunTable);

export class NutrientEntity {
    constructor(
        public Pk: string,
        public Sk: string,
        public NutrientChemicalName: string,
        public NutrientGenericName: string,
        public NutrientType: string,
        public NutrientUnits: string[],
    ) {}
}
