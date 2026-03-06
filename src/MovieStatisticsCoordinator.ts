import { MovieDefinition } from './movie/MovieDefinition';
import { IStatisticsServices } from './interfaces/IMovieStudioServices';
import { IBudgetCalculator } from './services/IBudgetCalculator';
import { IMoviePrintServiceFactory, IArchivePrintServiceFactory } from './interfaces/IPrintServiceFactories';

export class MovieStatisticsCoordinator {
    constructor(
        private services: IStatisticsServices,
        private budgetCalculator: IBudgetCalculator,
        private initialBudget: number,
        private moviePrintServiceFactory: IMoviePrintServiceFactory,
        private archivePrintServiceFactory: IArchivePrintServiceFactory
    ) {}

    printProducedMovieStatistics(movieDefinition: MovieDefinition) {
        this.moviePrintServiceFactory
            .create(movieDefinition, this.initialBudget, this.services.staffingService, this.budgetCalculator)
            .printProducedMovieStatistics();
    }

    printMovieArchiveStatistics(movieDefinition: MovieDefinition) {
        this.archivePrintServiceFactory
            .create(this.services.archiveStatisticsService)
            .printMovieArchiveStatistics();
    }
}