import { Movie } from './Movie';
import { MovieDeserializer } from './MovieDeserializer';


export class MovieArchiveParser {
    parse(resource: string): Movie[] {
        const raw = JSON.parse(resource);
        return MovieDeserializer.fromJsonArray(raw);
    }
}

