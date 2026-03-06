import { FinancialService } from '../thirdparty/FinancialService';
import { IStaffInformation } from '../staff/IStaffInformation';
import { StudioStaff } from '../staff/StudioStaff';
import { IProductionFeasibility } from '../movie/interfaces/IDelegates';

/**
 * Encapsulates the parameters needed for budget validation.
 * Reduces the number of arguments passed to BudgetValidator.validate()
 * and makes it easier to extend validation without changing signatures (ISP, OCP).
 */
export interface BudgetValidationContext {
    daysInProduction: number;
    movieStaff: StudioStaff;
    financialService: FinancialService;
    staffingService: IStaffInformation;
    producingService: IProductionFeasibility;
}
