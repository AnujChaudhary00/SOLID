import { Movie } from "./movie/Movie";
import { MovieDefinition } from "./movie/MovieDefinition";
import { IProducingService } from "./movie/interfaces/IDelegates";
import { IStaffingService } from "./staff/IStaffingService";
import { BudgetIsOverException } from "./thirdparty/BudgetIsOverException";
import { FinancialService } from "./thirdparty/FinancialService";
import { BudgetValidator } from "./services/BudgetValidator";
import { BudgetValidationContext } from "./services/BudgetValidationContext";
import { SalaryManager } from "./services/SalaryManager";
import { StudioEmployee } from "./thirdparty/StudioEmployee";
import { print } from "./utility/printUtility";

export class MovieProductionService {
    private movieDefinition!: MovieDefinition;
    private movie!: Movie;
    private budgetValidator: BudgetValidator;
    private salaryManager: SalaryManager;

    constructor(
        movie: Movie,
        movieDefinition: MovieDefinition,
        private financialService: FinancialService,
        private staffingService: IStaffingService,
        private producingService: IProducingService,
        budgetValidator: BudgetValidator,
        salaryManager: SalaryManager
    ) {
        this.financialService = financialService;
        this.staffingService = staffingService;
        this.producingService = producingService;
        this.movieDefinition = movieDefinition;
        this.movie = movie;
        this.budgetValidator = budgetValidator;
        this.salaryManager = salaryManager;
    }

    orchestrateProduction(movie: Movie, movieDefinition: MovieDefinition) {
        this.movieDefinition = movieDefinition;

        const validationContext: BudgetValidationContext = {
            daysInProduction: this.movieDefinition.getDaysInProduction(),
            movieStaff: this.movieDefinition.getMovieStaff(),
            financialService: this.financialService,
            staffingService: this.staffingService,
            producingService: this.producingService,
        };
        this.budgetValidator.validate(validationContext);
        this.staffingService.hireNewStaffFromStudioStaff(this.movieDefinition.getMovieStaff());
        this.producingService.initMovieProduction(this.movieDefinition.getDaysInProduction());
        const finished = this.executeMovieDay();
        if (finished) {
            movie.success();
            this.producingService.addMovieToArchive(movie);
        } else {
            print('Movie production aborted; not marking success or archiving.');
        }
    }

    
    private executeMovieDay(): boolean {
        while (this.producingService.executeProductionDay(this.staffingService)) {
            this.movie.updateContent();
            try {
                this.salaryManager.handleDaySalary(
                    this.financialService,
                    this.staffingService
                );
            } catch (e) {
                if (e instanceof BudgetIsOverException) {
                    print('Stopping production due to budget overrun.');
                    return false;
                }
                throw e;
            }
        }
        return true;
    }

    initialiseProduction(
        INITIAL_BUDGET: number,
        recruiter: StudioEmployee,
        accountant: StudioEmployee
    ): void {
        const totalBudget = this.movieDefinition.getTotalBudgetWith(INITIAL_BUDGET);
        this.financialService.initBudget(totalBudget);
        this.staffingService.hireNewStaff(recruiter, accountant);
    }
}
