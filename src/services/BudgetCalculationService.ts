import { FinancialService } from '../thirdparty/FinancialService';
import { IBudgetCalculator } from './IBudgetCalculator';


export class BudgetCalculationService implements IBudgetCalculator {
    
    constructor(private financialService: FinancialService) {}

    /**
     * Calculate the amount spent from the total budget
     * @param totalInitialBudget Total budget allocated (INITIAL_BUDGET + movieBudget)
     * @returns The amount spent
     */
    calculateBudgetSpent(totalInitialBudget: number): number {
        return totalInitialBudget - this.financialService.getBudget();
    }

    /**
     * Get the remaining budget
     * @returns The remaining budget
     */
    getRemainingBudget(): number {
        return this.financialService.getBudget();
    }
}
