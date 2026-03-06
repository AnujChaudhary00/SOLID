import { MovieProductionSchedule } from './MovieProductionSchedule';
import { IMovieSchedule } from './IMovieSchedule';
import { IScheduler } from './interfaces/IDelegates';


export class ProductionScheduler implements IScheduler {
    private schedule: IMovieSchedule;

    constructor(schedule?: IMovieSchedule, daysInProduction: number = 0) {
        this.schedule = schedule || new MovieProductionSchedule(daysInProduction);
    }

    init(daysInProduction: number): void {
        this.schedule.setDaysInProduction(daysInProduction);
    }

    hasNext(): boolean {
        return this.schedule.hasRemainingDays();
    }

    progress(): void {
        // Tell, Don't Ask: Delegate decrement logic to the schedule object
        this.schedule.decrementDays();
    }

    getProgress(): number {
        return this.schedule.getDaysSpentOnProduction();
    }
}
