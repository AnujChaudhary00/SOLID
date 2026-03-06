import { MovieDefinition } from '../movie/MovieDefinition';
import { IStaffInformation } from '../staff/IStaffInformation';
import { IBudgetCalculator } from '../services/IBudgetCalculator';
import { IArchiveStatisticsService } from '../movie/IArchiveStatisticsService';
import { MoviePrintService } from '../MoviePrintService';
import { ArchivePrintService } from '../ArchivePrintService';

export interface IMoviePrinter {
    printProducedMovieStatistics(): void;
}

export interface IArchivePrinter {
    printMovieArchiveStatistics(): Promise<void>;
}

/**
 * Factory interface for creating movie print services.
 * Allows MovieStatisticsCoordinator to depend on an abstraction
 * rather than instantiating MoviePrintService directly (DIP).
 */
export interface IMoviePrintServiceFactory {
    create(
        movieDefinition: MovieDefinition,
        initialBudget: number,
        staffingService: IStaffInformation,
        budgetCalculator: IBudgetCalculator
    ): IMoviePrinter;
}

/**
 * Factory interface for creating archive print services.
 * Allows MovieStatisticsCoordinator to depend on an abstraction
 * rather than instantiating ArchivePrintService directly (DIP).
 */
export interface IArchivePrintServiceFactory {
    create(archiveStatisticsService: IArchiveStatisticsService): IArchivePrinter;
}

export class DefaultMoviePrintServiceFactory implements IMoviePrintServiceFactory {
    create(
        movieDefinition: MovieDefinition,
        initialBudget: number,
        staffingService: IStaffInformation,
        budgetCalculator: IBudgetCalculator
    ): IMoviePrinter {
        return new MoviePrintService(movieDefinition, initialBudget, staffingService, budgetCalculator);
    }
}

export class DefaultArchivePrintServiceFactory implements IArchivePrintServiceFactory {
    create(archiveStatisticsService: IArchiveStatisticsService): IArchivePrinter {
        return new ArchivePrintService(archiveStatisticsService);
    }
}
