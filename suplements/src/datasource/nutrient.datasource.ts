import type { EntityItem } from 'dynamodb-toolbox';
import { NutrientEntityManager, NutrientEntity } from './entities/nutrient.entity';
import { NutrientDto } from '../dto/nutrientDto';

export default class NutrientDatasource {
    async GetNutrients(): Promise<NutrientEntity[]> {
        let { Items } = await NutrientEntityManager.query<NutrientEntity>('NUT');
        return Items || [];
    }

    async PutNutrient(nutrient: NutrientDto) {
        await NutrientEntityManager.put({
            Pk: '',
            Sk: nutrient.chemicalName,
            NutrientChemicalName: nutrient.chemicalName,
            NutrientGenericName: nutrient.genericName,
            NutrientType: nutrient.type,
            NutrientUnits: nutrient.units,
        });
    }
}
