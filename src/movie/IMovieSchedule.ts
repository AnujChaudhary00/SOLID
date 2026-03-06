
export interface IMovieSchedule {
    /**
     * Get the number of days spent/remaining in production
     */
    getDaysSpentOnProduction(): number;

    /**
     * Set the total days for production
     */
    setDaysInProduction(daysInProduction: number): void;

    /**
     * Decrement the production days by one
     */
    decrementDays(): void;

    /**
     * Tell, Don't Ask: answer whether production has remaining days.
     */
    hasRemainingDays(): boolean;
}
