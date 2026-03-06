import { FinanceDepartment } from "../finance/FinanceDepartment";
import { ProducingService } from "../movie/ProducingService";
import { StaffingService } from "../staff/StaffingService";
import { IMovieStudioServices } from "../interfaces/IMovieStudioServices";
import { ProductionScheduler } from "../movie/ProductionScheduler";
import { FeasibilityEstimator } from "../movie/FeasibilityEstimator";
import { ShootingCoordinator } from "../movie/ShootingCoordinator";
import { ArchiveRepository } from "../movie/ArchiveRepository";
import { ArchiveStatisticsService } from "../movie/ArchiveStatisticsService";
import { RoleFactory } from "../staff/RoleFactory";
import { Accountant } from "../staff/Accountant";
import { CameraMan } from "../staff/CameraMan";
import { Actor } from "../staff/Actor";
import { Recruiter } from "../staff/Recruiter";
import { BudgetValidator, DefaultBudgetValidator } from "../services/BudgetValidator";
import { SalaryManager, DefaultSalaryManager } from "../services/SalaryManager";

export function createMovieStudioServicesInstance(): IMovieStudioServices {
    const financialService = new FinanceDepartment();
    const staffingService = new StaffingService();
    const producingService = new ProducingService(new ProductionScheduler(), new FeasibilityEstimator(), new ShootingCoordinator(), new ArchiveRepository());
    const archiveStatisticsService = new ArchiveStatisticsService(producingService);

    // Register known role constructors for extensibility
    RoleFactory.register('accountant', (name: string) => new Accountant(name));
    RoleFactory.register('cameraman', (name: string) => new CameraMan(name));
    RoleFactory.register('actor', (name: string) => new Actor(name, false));
    RoleFactory.register('superstar', (name: string) => new Actor(name, true));

    // Dependency Inversion: Create and inject all dependencies
    const budgetValidator = new DefaultBudgetValidator();
    const salaryManager = new DefaultSalaryManager();

    return {
        financialService,
        staffingService,
        producingService,
        archiveStatisticsService,
        budgetValidator,
        salaryManager,
        createRecruiter: (name: string) => new Recruiter(name),
        createAccountant: (name: string) => new Accountant(name),
    };
}
