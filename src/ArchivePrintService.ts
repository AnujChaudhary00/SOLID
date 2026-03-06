import { IArchiveStatisticsService } from './movie/IArchiveStatisticsService';
import { print } from './utility/printUtility';

/**
 * Single responsibility: print archive statistics.
 */
export class ArchivePrintService {
    constructor(private archiveStatisticsService: IArchiveStatisticsService) {}

    async printMovieArchiveStatistics(): Promise<void> {
        const statisticsRepresentation = await this.archiveStatisticsService.getStatisticsRepresentation('film_archive.json');
        if (statisticsRepresentation) {
            print(statisticsRepresentation);
        }
    }
}

