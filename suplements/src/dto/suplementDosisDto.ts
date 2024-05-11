import 'reflect-metadata';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
 

export class SuplementDosisDto {
    @IsNotEmpty({ message: 'Suplement dosis amount can not be emtpy' })
    @IsNumber()
    amount: number;

    @IsNotEmpty({ message: 'Suplement dosis type can not be emtpy' })
    type: string;
}
