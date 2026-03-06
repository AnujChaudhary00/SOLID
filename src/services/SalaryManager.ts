import { FinancialService } from "../thirdparty/FinancialService";
import { IStaffInformation } from "../staff/IStaffInformation";


export interface SalaryManager {
    handleDaySalary(financialService: FinancialService, staffingService: IStaffInformation): void;
}

export class DefaultSalaryManager implements SalaryManager {
    handleDaySalary(
        financialService: FinancialService,
        staffingService: IStaffInformation
    ): void {
        // Let FinancialService/Accountant throw BudgetIsOverException so orchestrator can stop production.
        financialService.paySalary(staffingService.getStaff());
    }
}
