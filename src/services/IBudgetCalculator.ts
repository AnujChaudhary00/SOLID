
export interface IBudgetCalculator {
    /**
     * Calculate the amount spent from the total budget
     * @param totalInitialBudget Total budget allocated
     * @returns The amount spent
     */
    calculateBudgetSpent(totalInitialBudget: number): number;

    /**
     * Get the remaining budget
     * @returns The remaining budget
     */
    getRemainingBudget(): number;
}
