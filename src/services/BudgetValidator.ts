import { FinancialService } from "../thirdparty/FinancialService";
import { IProducingService } from "../movie/interfaces/IDelegates";
import { IStaffInformation } from "../staff/IStaffInformation";
import { StudioStaff } from "../staff/StudioStaff";
import { InsufficientBudgetException } from "../thirdparty/InsufficientBudgetException";

export interface BudgetValidator {
    validate(daysInProduction: number,
             movieStaff: StudioStaff,
             financialService: FinancialService,
             staffingService: IStaffInformation,
             producingService: IProducingService): void;
}

export class DefaultBudgetValidator implements BudgetValidator {
    validate(
        daysInProduction: number,
        movieStaff: StudioStaff,
        financialService: FinancialService,
        staffingService: IStaffInformation,
        producingService: IProducingService
    ): void {
        if (!producingService.canBeProduced(
            financialService.getBudget(),
            daysInProduction,
            staffingService,
            movieStaff
        )) {
            // keep the same exception type as previous implementation
            throw new InsufficientBudgetException('Movie cannot be produced - budget is insufficient');
        }
    }
}
