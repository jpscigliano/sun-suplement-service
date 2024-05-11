import { groupBy } from '../../common/utils';
import { NutrientCompound } from '../../dto/nutrientCompoundDto';
import { SuplementDosisDto, SuplementDto } from '../../dto/suplementDto';
import { SuplementDosisEntity, SuplementNutrientEntity } from '../entities/suplement.entity';

export default class SuplementMapper {
    static MapSuplementNutrientEntitysToDto(suplementEntitys: SuplementNutrientEntity[]): SuplementDto[] {
        suplementEntitys.forEach((item) => {
            console.log('------ SUPLEMENT MAP:  ' + item.Pk);
        });
        const suplementEntities = groupBy(suplementEntitys || [], (s) => s.Pk);

        const suplementsDto = Object.keys(suplementEntities).map((groupKey) => {
            const group = suplementEntities[groupKey];
            const nutrients = group.map((item) => {
                const compound: NutrientCompound = {
                    type: item.NutrientType ?? '',
                    chemicalName: item.NutrientChemicalName ?? '',
                    genericName: item.NutrientGenericName ?? '',
                    unit: item.NutrientUnit ?? '',
                    value: item.NutrientAmount ?? '',
                };

                return compound;
            });

            const dosis: SuplementDosisDto = {
                amount: group[0].SuplementDosis.Amount,
                type: group[0].SuplementDosis.Type,
            };

            const suplement: SuplementDto = {
                id: group[0].Pk ?? '',
                barcode: group[0].SuplementBarcode ?? '',
                dosis: dosis,
                brand: group[0].SuplementBrand ?? '',
                name: group[0].SuplementName,
                nutrients,
            };
            return suplement;
        });
        return suplementsDto;
    }

    static MapSuplementDtoToSuplementNutrientEnty(suplement: SuplementDto): SuplementNutrientEntity[] {
        const suplementNutrients = suplement.nutrients.map((item) => {
            const suplementDosis: SuplementDosisEntity = {
                Type: suplement.dosis.type,
                Amount: suplement.dosis.amount,
            };

            const SuplementNutrientEntity: SuplementNutrientEntity = {
                Pk: suplement.id,
                Sk: item.chemicalName,
                SuplementBarcode: suplement.barcode,
                SuplementBrand: suplement.brand,
                SuplementName: suplement.name,
                SuplementDosis: suplementDosis,
                NutrientChemicalName: item.chemicalName,
                NutrientGenericName: item.genericName,
                NutrientType: item.type,
                NutrientUnit: item.unit,
                NutrientAmount: item.value,
            };
            return SuplementNutrientEntity;
        });
        return suplementNutrients;
    }
}
