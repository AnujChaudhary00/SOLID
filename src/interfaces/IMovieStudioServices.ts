import { FinancialService } from "../thirdparty/FinancialService";
import { IStaffingService } from "../staff/IStaffingService";
import { IProducingService } from "../movie/interfaces/IDelegates";
import { IArchiveStatisticsService } from "../movie/IArchiveStatisticsService";
import { BudgetValidator } from "../services/BudgetValidator";
import { SalaryManager } from "../services/SalaryManager";
import { StudioEmployee } from "../thirdparty/StudioEmployee";

/**
 * Narrow view for components that only orchestrate production.
 */
export interface IProductionServices {
    financialService: FinancialService;
    staffingService: IStaffingService;
    producingService: IProducingService;
    budgetValidator: BudgetValidator;
    salaryManager: SalaryManager;
    createRecruiter(name: string): StudioEmployee;
    createAccountant(name: string): StudioEmployee;
}

/**
 * Narrow view for components that only need statistics/printing concerns.
 */
export interface IStatisticsServices {
    financialService: FinancialService;
    staffingService: IStaffingService;
    archiveStatisticsService: IArchiveStatisticsService;
}

/**
 * Composition root can still use the full map, but consumers should depend on
 * the narrower role-based views above (ISP).
 */
export interface IMovieStudioServices extends IProductionServices, IStatisticsServices {}
