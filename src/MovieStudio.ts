import { Movie } from './movie/Movie';
import { MovieDefinition } from './movie/MovieDefinition';
import { createMovieStudioServicesInstance } from './utility/serviceCreationUtility';
import { IMovieStudioServices } from './interfaces/IMovieStudioServices';
import { ProductionOrchestrator } from './ProductionOrchestrator';
import { MovieStatisticsCoordinator } from './MovieStatisticsCoordinator';
import { BudgetCalculationService } from './services/BudgetCalculationService';
import { DefaultMovieProductionServiceFactory } from './interfaces/IMovieProductionServiceFactory';
import { DefaultMoviePrintServiceFactory, DefaultArchivePrintServiceFactory } from './interfaces/IPrintServiceFactories';

const INITIAL_BUDGET = 1000000;


export class MovieStudio {
    private movieStudioServiceMap: IMovieStudioServices;
    private movieDefinition!: MovieDefinition;
    private productionOrchestrator!: ProductionOrchestrator;
    private movieStatisticsCoordinator!: MovieStatisticsCoordinator;

    constructor(services?: IMovieStudioServices) {
        // allow a caller (or tests) to provide a custom set of services; otherwise use defaults
        this.movieStudioServiceMap = services ? services : createMovieStudioServicesInstance();

        const movieProductionServiceFactory = new DefaultMovieProductionServiceFactory(this.movieStudioServiceMap);
        this.productionOrchestrator = new ProductionOrchestrator(this.movieStudioServiceMap, movieProductionServiceFactory);

        const budgetCalculator = new BudgetCalculationService(this.movieStudioServiceMap.financialService);
        this.movieStatisticsCoordinator = new MovieStatisticsCoordinator(
            this.movieStudioServiceMap,
            budgetCalculator,
            INITIAL_BUDGET,
            new DefaultMoviePrintServiceFactory(),
            new DefaultArchivePrintServiceFactory()
        );
    }

    /**
     * Create a movie with the given definition.
     * Delegates to ProductionOrchestrator for orchestration.
     * Prints statistics after production completes.
     */
    async createMovie(recruiterName: string, accountantName: string, movieDefinition: MovieDefinition): Promise<Movie> {
        this.movieDefinition = movieDefinition;

        // Delegate orchestration to ProductionOrchestrator
        const movie = await this.productionOrchestrator.orchestrateMovieProduction(
            recruiterName,
            accountantName,
            movieDefinition
        );

        // Delegate statistics printing to coordinator only after successful completion
        if (movie.isFinished) {
            this.movieStatisticsCoordinator.printProducedMovieStatistics(movieDefinition);
        }
        return movie;
    }

    async printMovieArchiveStatistics() {
        this.movieStatisticsCoordinator.printMovieArchiveStatistics(this.movieDefinition);
    }
}
