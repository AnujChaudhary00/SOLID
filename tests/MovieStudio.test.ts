import { MovieStudio } from '../src/MovieStudio';
import { MovieDefinition } from '../src/movie/MovieDefinition';
import { StudioStaff } from '../src/staff/StudioStaff';
import { Actor } from '../src/staff/Actor';
import { CameraMan } from '../src/staff/CameraMan';
import { Genre } from '../src/thirdparty/Genre';
import { InsufficientBudgetException } from '../src/thirdparty/InsufficientBudgetException';

describe('MovieStudio', () => {
    const movieStudio = new MovieStudio();
    const recruiterForTest = 'Andrew Carnegie';
    const accountantForTest = 'William Welch Deloitte';

    test('should create movie Titanic with valid movie definition', async () => {
        const PRODUCTION_SCHEDULE = 160;
        const staff = new StudioStaff([
            new Actor('Leo DiCaprio', true), new Actor('Kate Winslet', true),
        ], [
            new CameraMan('Guy Norman Bee'),
        ]);
        const budget = 150000000;
        const titanicMovie = new MovieDefinition(budget, 'Titanic', Genre.DRAMA, staff, PRODUCTION_SCHEDULE);
        const movie = await movieStudio.createMovie(recruiterForTest, accountantForTest, titanicMovie);
        expect(movie.isFinished).toBe(true);
    });

    test('should create movie StarWars with valid movie definition', async () => {
        const PRODUCTION_SCHEDULE = 90;
        const staff = new StudioStaff([
            new Actor('Mark Hamill', true), new Actor('Harrison Ford', true),
        ], [
            new CameraMan('John Campbell'),
        ]);
        const budget = 50000000;
        const starWars3Movie = new MovieDefinition(budget, 'Star Wars: Episode VI – Return of the Jedi', Genre.SCIFI, staff, PRODUCTION_SCHEDULE);
        const movie = await movieStudio.createMovie(recruiterForTest, accountantForTest, starWars3Movie);
        expect(movie.isFinished).toBe(true);
    });

    test('should create Empty Movie with Empty movie definition', async () => {
        const PRODUCTION_SCHEDULE = 1;
        const staff = new StudioStaff([], []);
        const budget = 1;
        const emptyMovie = new MovieDefinition(budget, 'Noname', Genre.COMEDY, staff, PRODUCTION_SCHEDULE);
        const movie = await movieStudio.createMovie(recruiterForTest, accountantForTest, emptyMovie);
        expect(movie.isFinished).toBe(true);
    });

    test('should fail create movie when budget exceeds', async () => {
        const PRODUCTION_SCHEDULE = 1000;
        const staff = new StudioStaff([
            new Actor('Taylor Kitsch', false),
        ], [
            new CameraMan('Carver Christians'),
        ]);
        const budget = 100000000;
        const johnCarterMovie = new MovieDefinition(budget, 'John Carter', Genre.FANTASY, staff, PRODUCTION_SCHEDULE);
        await expect(movieStudio.createMovie(recruiterForTest, accountantForTest, johnCarterMovie)).rejects.toThrow(InsufficientBudgetException);
    });

    test('should throw InsufficientBudgetException when Insufficient Budget', async () => {
        const PRODUCTION_SCHEDULE = 250;
        const staff = new StudioStaff([
            new Actor('Channing Tatum', true),
        ], [
            new CameraMan('Carver Christians'),
        ]);
        const budget = 100000000;
        const johnCarterMovie = new MovieDefinition(budget, 'Gambit', Genre.FANTASY, staff, PRODUCTION_SCHEDULE);
        await expect(movieStudio.createMovie(recruiterForTest, accountantForTest, johnCarterMovie)).rejects.toThrow(InsufficientBudgetException);
    });
});
