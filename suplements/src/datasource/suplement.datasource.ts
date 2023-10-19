import { SUPLEMENT_ID_SUFIX, SuplementEntityManager, SuplementNutrientEntity } from './entities/suplement.entity';
import { SuplementDto } from '../dto/suplementDto';
import { SunTable } from './TableConfiguration';
import SuplementMapper from './mappers/suplement.mapper';

export default class SuplementDatasource {
    async GetSuplements(): Promise<SuplementDto[]> {
        let { Items } = await SuplementEntityManager.query<SuplementNutrientEntity>('suplement', {
            index: 'ItemTypeIndex',
        });
        return SuplementMapper.MapSuplementNutrientEntitysToDto(Items || []);
    }

    async GetSuplementsById(id: string): Promise<SuplementDto> {
        const Items = (await SunTable.query(SUPLEMENT_ID_SUFIX + id, { limit: 50 })).Items || [];
        const suplementsDto = Object.keys(Items).map((groupKey) => {
            return Items[groupKey];
        });
        return SuplementMapper.MapSuplementNutrientEntitysToDto(suplementsDto)[0];
    }

    async PutSuplement(suplement: SuplementDto) {
        const transaction = SuplementMapper.MapSuplementDtoToSuplementNutrientEnty(suplement).map((item) => {
            return SuplementEntityManager.putTransaction(item);
        });

        const result = await SunTable.transactWrite(transaction, { capacity: 'total', metrics: 'size' });
    }
}
