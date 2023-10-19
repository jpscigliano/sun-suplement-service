export class NutrientDto {
    constructor(
        public type: string,
        public chemicalName: string,
        public genericName: string,
        public units: string[],
    ) {}
}
