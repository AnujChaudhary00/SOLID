import { IStaffInformation } from '../staff/IStaffInformation';
import { StudioStaff } from '../staff/StudioStaff';
import { IEstimator } from './interfaces/IDelegates';

/**
 * Abstraction for risk calculation so new strategies can be added
 * without modifying FeasibilityEstimator itself (Open-Closed Principle).
 */
export interface RiskMultiplierStrategy {
    getRiskMultiplier(): number;
}

const POTENTIAL_RISK = 15;

/**
 * Default risk strategy preserving the original budget behavior.
 */
export class DefaultRiskMultiplierStrategy implements RiskMultiplierStrategy {
    getRiskMultiplier(): number {
        return Math.round(100.0 + POTENTIAL_RISK / 100.0);
    }
}

export class FeasibilityEstimator implements IEstimator {
    constructor(
        private readonly riskStrategy: RiskMultiplierStrategy = new DefaultRiskMultiplierStrategy()
    ) {}

    canBeProduced(
        proposedBudget: number,
        daysInProduction: number,
        staffingService: IStaffInformation,
        movieStaff: StudioStaff
    ): boolean {
        // Tell, Don't Ask: Delegate salary calculation to the objects instead of asking and summing manually
        const dailyUnhired = movieStaff.getTotalSalary();
        const dailyHired = staffingService.getTotalSalary();

        const riskMultiplier = this.riskStrategy.getRiskMultiplier();
        const estimatedBudgetHired = dailyHired * daysInProduction * riskMultiplier;
        const estimatedTotalBudget = dailyUnhired + estimatedBudgetHired;
        return proposedBudget >= estimatedTotalBudget;
    }
}
