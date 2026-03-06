import { Movie } from './Movie';
import { GenreParser } from './GenreParser';


export class MovieDeserializer {
    /**
     * Deserialize JSON movie data into Movie objects.
     * @param moviesData Array of raw JSON movie objects
     * @returns Array of constructed Movie objects
     */
    static fromJsonArray(moviesData: any[]): Movie[] {
        return moviesData.map(movieData => MovieDeserializer.fromJsonObject(movieData));
    }

    /**
     * Deserialize a single JSON movie object into a Movie.
     * Encapsulates all validation and construction logic.
     * 
     * @param movieData Raw JSON object
     * @returns Constructed Movie object
     */
    static fromJsonObject(movieData: any): Movie {
        const movie = new Movie();
        const genreParser = new GenreParser();
        
        // Set name if present
        if (movieData.name) {
            movie.setName(movieData.name);
        }
        
        // Set genre if valid
        const parsedGenre = genreParser.parse(movieData.genre);
        if (parsedGenre) {
            movie.setGenre(parsedGenre);
        }
        
        // Set days in production if numeric
        if (typeof movieData.daysInProduction === 'number') {
            movie.setDaysInProduction(movieData.daysInProduction);
        }
        
        // Set crew if present
        if (movieData.crew && typeof movieData.crew === 'object') {
            const crewMap = new Map<string, number>(
                Object.entries(movieData.crew).map(([k, v]) => [k, Number(v)])
            );
            movie.setCrew(crewMap);
        }
        
        // Set superstars if array
        if (Array.isArray(movieData.superstars)) {
            movie.setSuperstars(movieData.superstars.slice());
        }
        
        return movie;
    }
}
