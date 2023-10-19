import 'reflect-metadata';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { NutrientCompound } from './nutrientCompound';
import { Type, Transform, plainToInstance } from 'class-transformer';

export class SuplementDto {
    id: string;

    barcode: string;

    brand: string;

    @IsNotEmpty({ message: 'Suplement name amount can not be emtpy' })
    name: string;

    @ValidateNested()
    @Type(() => SuplementDosisDto)
    dosis: SuplementDosisDto;

    nutrients: NutrientCompound[];
}
export class SuplementDosisDto {
    @IsNotEmpty({ message: 'Suplement dosis amount can not be emtpy' })
    @IsNumber()
    amount: number;

    @IsNotEmpty({ message: 'Suplement dosis type can not be emtpy' })
    type: string;
}
