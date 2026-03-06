import { Movie } from './movie/Movie';
import { MovieDefinition } from './movie/MovieDefinition';
import { IProductionServices } from './interfaces/IMovieStudioServices';
import { IMovieProductionServiceFactory } from './interfaces/IMovieProductionServiceFactory';

const INITIAL_BUDGET = 1000000;


export class ProductionOrchestrator {
    constructor(
        private services: IProductionServices,
        private movieProductionServiceFactory: IMovieProductionServiceFactory
    ) {}

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

        // Use injected factory to create MovieProductionService (DIP)
        const movieProductionService = this.movieProductionServiceFactory.create(movie, movieDefinition);

        // Create recruiter and accountant instances
        const recruiter = this.services.createRecruiter(recruiterName);
        const accountant = this.services.createAccountant(accountantName);
        
        // Initialize production with budget and staff
        movieProductionService.initialiseProduction(INITIAL_BUDGET, recruiter, accountant);
        
        // Execute the production
        movieProductionService.orchestrateProduction(movie, movieDefinition);
        
        return movie;
    }
}
