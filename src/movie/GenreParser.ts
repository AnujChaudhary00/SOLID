import { Genre } from '../thirdparty/Genre';

/**
 * Responsible for safely converting untyped input into a Genre enum value.
 */
export class GenreParser {
    parse(raw: unknown): Genre | undefined {
        if (typeof raw !== 'string') {
            return undefined;
        }

        const value = (Genre as Record<string, Genre | undefined>)[raw];
        return value;
    }
}

