import { IProducingService } from './interfaces/IDelegates';
import { MovieStatistics } from './MovieStatistics';
import { ArchiveStatisticsFormatter } from './ArchiveStatisticsFormatter';
import { IArchiveStatisticsService } from './IArchiveStatisticsService';


export class ArchiveStatisticsService implements IArchiveStatisticsService {
    
    constructor(
        private producingService: IProducingService,
        private formatter: ArchiveStatisticsFormatter = new ArchiveStatisticsFormatter()
    ) {}

    /**
     * Load movie statistics from the archive database
     * @param dbFileName The name of the database file to load
     * @returns The loaded movie statistics
     */
    async loadMovieStatistics(dbFileName: string): Promise<MovieStatistics> {
        return await this.producingService.loadMovieDatabase(dbFileName);
    }

    /**
     * Get formatted representation of archive statistics
     * @returns Formatted string of archive statistics, or empty string if no data
     */
    async getStatisticsRepresentation(dbFileName: string): Promise<string> {
        const movieStatistics = await this.loadMovieStatistics(dbFileName);
        return this.formatter.format(movieStatistics);
    }
}
