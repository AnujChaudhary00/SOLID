import { MovieDefinition } from "./movie/MovieDefinition";
import { IStaffInformation } from "./staff/IStaffInformation";
import { IBudgetCalculator } from "./services/IBudgetCalculator";
import { print } from "./utility/printUtility";


export class MoviePrintService {

    private movieDefinition!: MovieDefinition;
    private totalInitialBudget!: number;
    private staffingService!: IStaffInformation;
    private budgetCalculator!: IBudgetCalculator;

    constructor(
        movieDefinition: MovieDefinition,
        INITIAL_BUDGET: number,
        staffingService: IStaffInformation,
        budgetCalculator: IBudgetCalculator
    ) {
        this.movieDefinition = movieDefinition;
        this.totalInitialBudget = movieDefinition.getTotalBudgetWith(INITIAL_BUDGET);
        this.staffingService = staffingService;
        this.budgetCalculator = budgetCalculator;
    }

    printProducedMovieStatistics() {
        const budgetSpent = this.budgetCalculator.calculateBudgetSpent(this.totalInitialBudget);
        const remainingBudget = this.budgetCalculator.getRemainingBudget();
        print(`Budget: ${this.totalInitialBudget} initial, ${budgetSpent} spent, ${remainingBudget} economy`);
        this.staffingService.getStaff().forEach(person => {
            print(person.getPrintRepresentation());
        });
    }

}