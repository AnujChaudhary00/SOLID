import { FinancialService } from '../thirdparty/FinancialService';
import { StudioEmployee } from '../thirdparty/StudioEmployee';
import { BudgetService } from './BudgetService';
import { PaymentOrchestrator } from './PaymentOrchestrator';

export class FinanceDepartment implements FinancialService {
    private budgetService: BudgetService;
    private paymentOrchestrator: PaymentOrchestrator;

    constructor() {
        this.budgetService = new BudgetService(0);
        this.paymentOrchestrator = new PaymentOrchestrator();
    }

    decreaseBudget(paidSum: number): void {
        this.budgetService.decreaseBudget(paidSum);
    }

    initBudget(initialSum: number): void {
        this.budgetService.initBudget(initialSum);
    }

    paySalary(employees: StudioEmployee[]): void {
        this.paymentOrchestrator.paySalary(employees, this);
    }

  
    paySalaryToEmployee(employee: StudioEmployee): void {
        this.budgetService.paySalaryToEmployee(employee);
    }

    getBudget(): number {
        return this.budgetService.getBudget();
    }
}
