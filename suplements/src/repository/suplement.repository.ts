import SuplementDatasource from '../datasource/suplement.datasource';
import { SuplementDto } from '../dto/suplementDto';
import { v4 as uuid } from 'uuid';
import Error404 from '../error/Error404';
import { ErrorCode } from '../error/errorCodes';

export class SuplementRepositoryImpl {
    protected suplementDatasource: SuplementDatasource;

    constructor() {
        this.suplementDatasource = new SuplementDatasource();
    }

    async GetSuplements(): Promise<SuplementDto[]> {
        const suplementNutrientsEntities = await this.suplementDatasource.GetSuplements();
        return suplementNutrientsEntities;
    }

    async GetSuplementById(id: string): Promise<SuplementDto> {
        if (!id) {
            throw new Error404(ErrorCode.NotFound_Suplements, 'Suplement ' + id + ' invalid');
        }
        const suplementNutrientsEntities = await this.suplementDatasource.GetSuplementsById(id);
        if (!suplementNutrientsEntities) {
            throw new Error404(ErrorCode.NotFound_Suplements, 'Suplement ' + id + ' not found');
        }
        return suplementNutrientsEntities;
    }

    async PutSuplement(suplement: SuplementDto): Promise<SuplementDto> {
        if (!suplement.id || suplement.id == '') {
            suplement.id = uuid();
        }

        await this.suplementDatasource.PutSuplement(suplement);
        return suplement;
    }
}
