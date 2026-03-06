import { MovieStatistics } from './MovieStatistics';


export interface IArchiveStatisticsService {
    loadMovieStatistics(dbFileName: string): Promise<MovieStatistics>;
    getStatisticsRepresentation(dbFileName: string): Promise<string>;
}

