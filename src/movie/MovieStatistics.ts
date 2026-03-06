import { Movie } from './Movie';

export class MovieStatistics {
    private genres: { [key: string]: number };
    private roleCounts: Map<string, number>;
    private superstars: Set<string>;

    constructor(movieArchive: Movie[]) {
        this.genres = {};
        this.roleCounts = new Map<string, number>();
        this.superstars = new Set<string>();

        if (movieArchive && movieArchive.length > 0) {
            movieArchive.forEach(movie => {
                const currentMovieGenre = movie.getGenre();
                this.genres[currentMovieGenre] = (this.genres[currentMovieGenre] || 0) + 1;
                
                // Dynamically aggregate all roles from the crew, allowing new roles without modification
                for (const [role, count] of movie.getCrew()) {
                    this.roleCounts.set(role, (this.roleCounts.get(role) || 0) + count);
                }
                
                movie.getSuperstars().forEach(star => this.superstars.add(star));
            });
        }
    }

    public isEmpty(): boolean {
        let totalStaff = 0;
        for (const count of this.roleCounts.values()) {
            totalStaff += count;
        }
        return totalStaff + this.superstars.size === 0;
    }

    /**
     * Get the total count for a specific role
     * @param role The role name (e.g., "Actor", "CameraMan")
     * @returns The total count for that role, or 0 if not found
     */
    getTotalByRole(role: string): number {
        return this.roleCounts.get(role) || 0;
    }

    /**
     * Backward compatible method - get total actors
     */
    getTotalActors(): number {
        return this.getTotalByRole('Actor');
    }

    /**
     * Backward compatible method - get total cameramen
     */
    getTotalCameramen(): number {
        return this.getTotalByRole('CameraMan');
    }

    public getSuperstars(): Set<string> {
        // return a shallow copy to avoid external mutation
        return new Set(this.superstars);
    }

    public getGenres(): { [key: string]: number } {
        // return a shallow copy to avoid external mutation
        return Object.assign({}, this.genres);
    }

    /**
     * @returns A map of all roles and their counts
     */
    public getRoleCounts(): Map<string, number> {
        return new Map(this.roleCounts);
    }
}
