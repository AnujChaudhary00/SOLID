import { MovieStatistics } from './MovieStatistics';
import { IArchiveRepository } from './interfaces/IDelegates';
import { FileContentReader } from './FileContentReader';
import { FileSystemContentReader } from './FileSystemContentReader';
import { MovieArchiveParser } from './MovieArchiveParser';
import { print } from '../utility/printUtility';

export class ArchiveRepository implements IArchiveRepository {
    constructor(
        private contentReader: FileContentReader = new FileSystemContentReader(),
        private parser: MovieArchiveParser = new MovieArchiveParser()
    ) {}

    async loadMovieDatabase(fileName: string): Promise<MovieStatistics> {
        // Tell, Don't Ask: Delegate file reading to injected reader
        const resource = this.contentReader.readFile(fileName);
        
        if (resource === null) {
            print('Movie archive is damaged or empty');
            return new MovieStatistics([]);
        }

        try {
            const archive = this.parser.parse(resource);
            return new MovieStatistics(archive);
        } catch (e) {
            print('Movie archive is damaged or empty');
            return new MovieStatistics([]);
        }
    }
}
