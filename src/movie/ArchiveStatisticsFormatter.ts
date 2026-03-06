import { MovieStatistics } from './MovieStatistics';

/**
 * Single responsibility: convert MovieStatistics into a printable string representation.
 */
export class ArchiveStatisticsFormatter {
    format(movieStatistics: MovieStatistics): string {
        if (movieStatistics.isEmpty()) {
            return '';
        }

        const totalActors = movieStatistics.getTotalActors();
        const totalCameramen = movieStatistics.getTotalCameramen();
        const superstars = Array.from(movieStatistics.getSuperstars()).join(', ');

        return `Total: ${totalActors} actors, ${totalCameramen} cameramen, superstars: [${superstars}]`;
    }
}

