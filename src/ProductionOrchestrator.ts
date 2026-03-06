import { Movie } from './movie/Movie';
import { MovieDefinition } from './movie/MovieDefinition';
import { MovieProductionService } from './MovieProductionService';
import { IProductionServices } from './interfaces/IMovieStudioServices';
import { BudgetCalculationService } from './services/BudgetCalculationService';

const INITIAL_BUDGET = 1000000;


export class ProductionOrchestrator {
    constructor(private services: IProductionServices) {}

    /**
     * Execute the production of a movie with given definition and staff.
     * 
     * @param recruiterName Name for the recruiter
     * @param accountantName Name for the accountant
     * @param movieDefinition The movie definition with all production parameters
     * @returns The completed movie
     */
    async orchestrateMovieProduction(
        recruiterName: string,
        accountantName: string,
        movieDefinition: MovieDefinition
    ): Promise<Movie> {
        const movie = new Movie(
            movieDefinition.getMovieName(),
            movieDefinition.getMovieGenre(),
            movieDefinition.getMovieStaff()
        );

        // Create MovieProductionService with all injected dependencies
        const movieProductionService = new MovieProductionService(
            movie,
            movieDefinition,
            this.services.financialService,
            this.services.staffingService,
            this.services.producingService,
            this.services.budgetValidator,
            this.services.salaryManager
        );

        // Create recruiter and accountant instances
        const recruiter = this.services.createRecruiter(recruiterName);
        const accountant = this.services.createAccountant(accountantName);
        
        // Initialize production with budget and staff
        movieProductionService.intialiseProduction(INITIAL_BUDGET, recruiter, accountant);
        
        // Execute the production
        movieProductionService.orchestrateProduction(movie, movieDefinition);
        
        return movie;
    }
}
