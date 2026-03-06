import { Genre } from '../thirdparty/Genre';
import { StudioStaff } from '../staff/StudioStaff';


export class Movie {
    private _isFinished: boolean;
    private _name: string;
    private _genre: Genre;
    private _daysInProduction: number;
    private _crew: Map<string, number>;
    private _superstars: string[];

    constructor();
    constructor(name: string, genre: Genre, staff: StudioStaff);
    constructor(name?: string, genre?: Genre, staff?: StudioStaff) {
        this._name = name || '';
        this._genre = genre || Genre.DRAMA;
        this._isFinished = false;
        this._daysInProduction = 0;
        this._crew = new Map<string, number>();
        this._superstars = [];
        if (staff) {
            this.setCrewFromStaffCollection(staff);
        }
    }

    setCrewFromStaffCollection(staff: StudioStaff): void {
        const roleCount = new Map<string, number>();
        
        // Iterate through all staff and count by their role
        for (const staffMember of staff.getAllPlannedStaff()) {
            const role = staffMember.getRole();
            roleCount.set(role, (roleCount.get(role) || 0) + 1);
        }
        
        // Set all counted roles in the crew map
        for (const [role, count] of roleCount) {
            this._crew.set(role, count);
        }
        
        // Tell, Don't Ask: Delegate superstar collection to StudioStaff
        this._superstars = staff.getSuperstars();
    }

    getCrew(): Map<string, number> {
        return this._crew;
    }

    setCrew(crew: Map<string, number>): void {
        this._crew = crew;
    }

    getSuperstars(): string[] {
        return this._superstars;
    }

    setSuperstars(superstars: string[]): void {
        this._superstars = superstars;
    }

    success(): void {
        this._isFinished = true;
    }

    updateContent(): void {
        this._daysInProduction++;
    }

    getName(): string {
        return this._name;
    }

    setName(name: string): void {
        this._name = name;
    }

    getGenre(): Genre {
        return this._genre;
    }

    setGenre(genre: Genre): void {
        this._genre = genre;
    }

    getDaysInProduction(): number {
        return this._daysInProduction;
    }

    setDaysInProduction(daysInProduction: number): void {
        this._daysInProduction = daysInProduction;
    }

    isMovieFinished(): boolean {
        return this._isFinished;
    }

    setIsFinished(finished: boolean): void {
        this._isFinished = finished;
    }

    get isFinished(): boolean {
        return this._isFinished;
    }

    set isFinished(finished: boolean) {
        this._isFinished = finished;
    }

    toString(): string {
        return `Movie '${this._name}' [${this._genre}], status: ${this._isFinished ? 'finished' : 'in production'}, days in production: ${this._daysInProduction}`;
    }
}
