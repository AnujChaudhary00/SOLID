import { MovieBudget } from './MovieBudget';
import { BudgetIsOverException } from '../thirdparty/BudgetIsOverException';

export class BudgetService {
    private movieBudget: MovieBudget;

    constructor(initial: number = 0) {
        this.movieBudget = new MovieBudget(initial);
    }

    initBudget(initialSum: number): void {
        this.movieBudget = new MovieBudget(initialSum);
    }

    decreaseBudget(paidSum: number): void {
        this.movieBudget.decreaseBy(paidSum);
    }

    getBudget(): number {
        return this.movieBudget.getBudgetMoney();
    }

  
    paySalaryToEmployee(employee: { getSalary(): number; paySalary(amount: number): void }): void {
        const salary = employee.getSalary();
        if (!this.movieBudget.canDecrease(salary)) {
            throw new BudgetIsOverException('Budget is over');
        }
        employee.paySalary(salary);
        this.movieBudget.decreaseBy(salary);
    }
}
