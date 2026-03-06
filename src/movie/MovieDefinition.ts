import { Genre } from '../thirdparty/Genre';
import { StudioStaff } from '../staff/StudioStaff';


export class MovieDefinition {
    private budget: number;
    private movieName: string;
    private movieGenre: Genre;
    private movieStaff: StudioStaff;
    private daysInProduction: number;

    constructor(budget: number, movieName: string, movieGenre: Genre, movieStaff: StudioStaff, daysInProduction: number) {
        this.validateBudget(budget);
        this.validateDaysInProduction(daysInProduction);
        this.budget = budget;
        this.movieName = movieName;
        this.movieGenre = movieGenre;
        this.movieStaff = movieStaff;
        this.daysInProduction = daysInProduction;
    }

    private validateBudget(budget: number): void {
        if (budget < 0) {
            throw new Error('Budget cannot be negative');
        }
    }

    private validateDaysInProduction(days: number): void {
        if (days < 0) {
            throw new Error('Days in production cannot be negative');
        }
    }

    getBudget(): number {
        return this.budget;
    }

    getMovieName(): string {
        return this.movieName;
    }

    getMovieGenre(): Genre {
        return this.movieGenre;
    }

    getMovieStaff(): StudioStaff {
        return this.movieStaff;
    }

    getDaysInProduction(): number {
        return this.daysInProduction;
    }

    // For backward compatibility with code that constructs total budget
    getTotalBudgetWith(standardBudget: number): number {
        return standardBudget + this.budget;
    }
}
