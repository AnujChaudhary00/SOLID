import { MoviePrintService } from './MoviePrintService';
import { ArchivePrintService } from './ArchivePrintService';
import { MovieDefinition } from './movie/MovieDefinition';
import { IStatisticsServices } from './interfaces/IMovieStudioServices';
import { IBudgetCalculator } from './services/IBudgetCalculator';

export class MovieStatisticsCoordinator {
    private services: IStatisticsServices;
    private budgetCalculator: IBudgetCalculator;
    private initialBudget: number;

    constructor(services: IStatisticsServices, budgetCalculator: IBudgetCalculator, initialBudget: number) {
        this.services = services;
        this.budgetCalculator = budgetCalculator;
        this.initialBudget = initialBudget;
    }

    printProducedMovieStatistics(movieDefinition: MovieDefinition) {
        this.createMoviePrintService(movieDefinition).printProducedMovieStatistics();
    }

    printMovieArchiveStatistics(movieDefinition: MovieDefinition) {
        this.createArchivePrintService().printMovieArchiveStatistics();
    }

    private createMoviePrintService(movieDefinition: MovieDefinition): MoviePrintService {
        return new MoviePrintService(
            movieDefinition,
            this.initialBudget,
            this.services.staffingService,
            this.budgetCalculator
        );
    }

    private createArchivePrintService(): ArchivePrintService {
        return new ArchivePrintService(this.services.archiveStatisticsService);
    }
}