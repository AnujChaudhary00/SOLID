import { StudioEmployee } from './StudioEmployee';

export interface FinancialService {
    initBudget(initialSum: number): void;
    decreaseBudget(paidSum: number): void;
    paySalary(employees: StudioEmployee[]): void;
    paySalaryToEmployee(employee: StudioEmployee): void;
    getBudget(): number;
}
