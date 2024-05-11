import { IntakeDto } from "../dto/intakeDto";

 

export class IntakeRepositoryImpl {
    

    constructor() {
      
    }

    async PutIntake(intake:IntakeDto): Promise<Boolean> {
   
        return true;
    }
}
