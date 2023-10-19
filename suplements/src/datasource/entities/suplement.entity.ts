import { Entity } from 'dynamodb-toolbox';
import { SunTable } from '../TableConfiguration';
import { TableDef } from 'dynamodb-toolbox/dist/classes/Table';

export const SUPLEMENT_ID_SUFIX = 'SUP#';

const getSuplementEntityManager = (sunTable: TableDef) =>
    new Entity({
        // Specify entity name
        name: 'Suplement',
        // Define attributes
        attributes: {
            Pk: { type: 'string', partitionKey: true, prefix: SUPLEMENT_ID_SUFIX }, // flag as partitionKey
            Sk: { type: 'string', sortKey: true, prefix: SUPLEMENT_ID_SUFIX }, // flag as sortKey and mark hidden
            ItemTypeIndex: { hidden: true, partitionKey: 'ItemTypeIndex', default: 'suplement' },
            SuplementBarcode: { type: 'string' },
            SuplementBrand: { type: 'string' },
            SuplementName: { type: 'string' },
            SuplementDosis: { type: 'map' },
            NutrientChemicalName: { type: 'string' },
            NutrientGenericName: { type: 'string' },
            NutrientType: { type: 'string' },
            NutrientUnit: { type: 'string' },
            NutrientAmount: { type: 'number' },
        },
        table: sunTable,
    } as const);
export const SuplementEntityManager = getSuplementEntityManager(SunTable);

export class SuplementNutrientEntity {
    constructor(
        public Pk: string,
        public Sk: string,
        public SuplementBarcode: string,
        public SuplementBrand: string,
        public SuplementName: string,
        public SuplementDosis: SuplementDosisEntity,
        public NutrientChemicalName: string,
        public NutrientGenericName: string,
        public NutrientType: string,
        public NutrientUnit: string,
        public NutrientAmount: number,
    ) {}
}

export class SuplementDosisEntity {
    constructor(
        public Type: string,
        public Amount: number,
    ) {}
}
