import 'reflect-metadata';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SuplementDosisDto } from './suplementDosisDto';
 


export class IntakeDto {
   
    id: string;

    @IsNotEmpty({ message: 'Plan ID can not be emtpy' })
    planId:string;
   
    @IsNotEmpty({ message: 'Suplement ID can not be emtpy' })
    suplementId:string;
   

    @ValidateNested()
    @Type(() => SuplementDosisDto)
    morningDosis: SuplementDosisDto;

    @ValidateNested()
    @Type(() => SuplementDosisDto)
    middayDosis: SuplementDosisDto;

    @ValidateNested()
    @Type(() => SuplementDosisDto)
    eveningDosis: SuplementDosisDto;

    @ValidateNested()
    @Type(() => SuplementDosisDto)
    nightDosis: SuplementDosisDto;

    comments:string;
}
