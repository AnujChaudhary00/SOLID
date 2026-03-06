import { Movie } from '../movie/Movie';
import { MovieDefinition } from '../movie/MovieDefinition';
import { StudioEmployee } from '../thirdparty/StudioEmployee';
import { MovieProductionService } from '../MovieProductionService';
import { IProductionServices } from './IMovieStudioServices';

/**
 * Abstracts the operations ProductionOrchestrator needs from a production service.
 * Decouples ProductionOrchestrator from the concrete MovieProductionService class (DIP).
 */
export interface IMovieProductionOperations {
    initialiseProduction(initialBudget: number, recruiter: StudioEmployee, accountant: StudioEmployee): void;
    orchestrateProduction(movie: Movie, movieDefinition: MovieDefinition): void;
}

/**
 * Factory interface used by ProductionOrchestrator to create a production service
 * per movie without being coupled to the concrete MovieProductionService type (DIP).
 */
export interface IMovieProductionServiceFactory {
    create(movie: Movie, movieDefinition: MovieDefinition): IMovieProductionOperations;
}

export class DefaultMovieProductionServiceFactory implements IMovieProductionServiceFactory {
    constructor(private readonly services: IProductionServices) {}

    create(movie: Movie, movieDefinition: MovieDefinition): IMovieProductionOperations {
        return new MovieProductionService(
            movie,
            movieDefinition,
            this.services.financialService,
            this.services.staffingService,
            this.services.producingService,
            this.services.budgetValidator,
            this.services.salaryManager
        );
    }
}
