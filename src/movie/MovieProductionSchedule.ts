import { IMovieSchedule } from './IMovieSchedule';

export class MovieProductionSchedule implements IMovieSchedule {
    private daysInProduction: number;

    constructor(daysInProduction: number) {
        this.daysInProduction = daysInProduction;
    }

    getDaysSpentOnProduction(): number {
        return this.daysInProduction;
    }

    setDaysInProduction(daysInProduction: number): void {
        this.daysInProduction = daysInProduction;
    }

    decrementDays(): void {
        this.daysInProduction--;
    }

    hasRemainingDays(): boolean {
        return this.daysInProduction > 0;
    }
}
