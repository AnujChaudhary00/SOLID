import { IStaffInformation } from '../../staff/IStaffInformation';
import { StudioStaff } from '../../staff/StudioStaff';
import { Movie } from '../Movie';
import { MovieStatistics } from '../MovieStatistics';

export interface IScheduler {
    init(days: number): void;
    hasNext(): boolean;
    progress(): void;
    getProgress(): number;
}

export interface IEstimator {
    canBeProduced(proposedBudget: number, daysInProduction: number, staffingService: IStaffInformation, movieStaff: StudioStaff): boolean;
}

export interface IShootingCoordinator {
    attemptShoot(staffingService: IStaffInformation): boolean;
}

export interface IArchiveRepository {
    loadMovieDatabase(fileName: string): Promise<MovieStatistics>;
}


export interface IArchiveManagement {
    loadMovieDatabase(fileName: string): Promise<MovieStatistics>;
    addMovieToArchive(movie: Movie): void;
}


export interface IProductionScheduling {
    initMovieProduction(daysInProduction: number): void;
    hasNextWorkingDay(): boolean;
    progress(): void;
    getProgress(): number;
   
    executeProductionDay(staffingService: IStaffInformation): boolean;
}

export interface IFilmProduction {
    lightsCameraAction(staffingService: IStaffInformation): boolean;
}


export interface IProductionFeasibility {
    canBeProduced(proposedBudget: number, daysInProduction: number, staffingService: IStaffInformation, movieStaff: StudioStaff): boolean;
}


export interface IProducingService extends IArchiveManagement, IProductionScheduling, IFilmProduction, IProductionFeasibility {
    // Composite interface - no additional methods needed
}
