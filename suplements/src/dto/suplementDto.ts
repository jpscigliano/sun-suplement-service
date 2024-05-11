import 'reflect-metadata';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { NutrientCompoundDto } from './nutrientCompoundDto';
import { Type, Transform, plainToInstance } from 'class-transformer';
import { SuplementDosisDto } from './suplementDosisDto';

export class SuplementDto {
    id: string;

    barcode: string;

    brand: string;

    @IsNotEmpty({ message: 'Suplement name amount can not be emtpy' })
    name: string;

    @IsNotEmpty({ message: 'Dosis can not be emtpy' })
    @ValidateNested()
    @Type(() => SuplementDosisDto)
    dosis: SuplementDosisDto;

    nutrients: NutrientCompoundDto[];
}
