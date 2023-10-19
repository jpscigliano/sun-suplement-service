import NutrientDatasource from '../datasource/nutrient.datasource';
import { NutrientDto } from '../dto/nutrientDto';

export class NutrientRepositoryImpl {
    protected nutrientDatasource: NutrientDatasource;

    constructor() {
        this.nutrientDatasource = new NutrientDatasource();
    }

    async GetNutrients(): Promise<NutrientDto[]> {
        const nutrientEntities = await this.nutrientDatasource.GetNutrients();

        const nutrients = nutrientEntities.map((item) => {
            const nutrient: NutrientDto = {
                type: item.NutrientType,
                chemicalName: item.NutrientChemicalName ?? '',
                genericName: item.NutrientGenericName ?? '',
                units: item.NutrientUnits ?? [],
            };
            return nutrient;
        });
        return nutrients;
    }

    async PutNutrient(nutrient: NutrientDto): Promise<NutrientDto> {
        await this.nutrientDatasource.PutNutrient(nutrient);
        return nutrient;
    }
}
