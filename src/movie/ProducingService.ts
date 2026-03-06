import { Movie } from './Movie';
import { MovieProductionSchedule } from './MovieProductionSchedule';
import { IStaffInformation } from '../staff/IStaffInformation';
import { MovieStatistics } from './MovieStatistics';
import { StudioStaff } from '../staff/StudioStaff';
import { IScheduler, IEstimator, IShootingCoordinator, IArchiveRepository, IProducingService } from './interfaces/IDelegates';


export class ProducingService implements IProducingService {
    private movieArchive: Movie[];
    private scheduler: IScheduler;
    private estimator: IEstimator;
    private shooter: IShootingCoordinator;
    private archiveRepo: IArchiveRepository;
    
    constructor(
        scheduler: IScheduler,
        estimator: IEstimator,
        shooter: IShootingCoordinator,
        archiveRepo: IArchiveRepository
    ) {
        this.movieArchive = [];
        this.scheduler = scheduler;
        this.estimator = estimator;
        this.shooter = shooter;
        this.archiveRepo = archiveRepo;
    }

    async loadMovieDatabase(fileName: string): Promise<MovieStatistics> {
        return this.archiveRepo.loadMovieDatabase(fileName);
    }

    public addMovieToArchive(movie: Movie): void {
        this.movieArchive.push(movie);
    }

    public initMovieProduction(daysInProduction: number): void {
        this.scheduler.init(daysInProduction);
    }

    public hasNextWorkingDay(): boolean {
        return this.scheduler.hasNext();
    }

    public progress(): void {
        this.scheduler.progress();
    }

    public lightsCameraAction(staffingService: IStaffInformation): boolean {
        return this.shooter.attemptShoot(staffingService);
    }

    public getProgress(): number {
        return this.scheduler.getProgress();
    }

    public canBeProduced(proposedBudget: number, daysInProduction: number, staffingService: IStaffInformation, movieStaff: StudioStaff): boolean {
        return this.estimator.canBeProduced(proposedBudget, daysInProduction, staffingService, movieStaff);
    }

    /**
     * @param staffingService The staff information for shooting
     * @returns true if there's a next working day and shooting was successful, false otherwise
     */
    public executeProductionDay(staffingService: IStaffInformation): boolean {
        // Check if there's another working day
        if (!this.hasNextWorkingDay()) {
            return false;
        }
        
        // Attempt to shoot with current staff
        if (this.lightsCameraAction(staffingService)) {
            // If successful, progress to next day
            this.progress();
            return true;
        }
        
        // No shooting success but still have days, progress anyway
        this.progress();
        return true;
    }
}
