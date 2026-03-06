import { BudgetIsOverException } from '../thirdparty/BudgetIsOverException';

export class MovieBudget {
    private budgetMoney: number;

    constructor(budgetMoney: number) {
        this.budgetMoney = budgetMoney;
    }

    getBudgetMoney() {
        return this.budgetMoney;
    }

   
    canDecrease(amount: number): boolean {
        return this.budgetMoney >= amount;
    }

   
    decreaseBy(amount: number): void {
        if (!this.canDecrease(amount)) {
            throw new BudgetIsOverException('Budget is over');
        }
        this.budgetMoney -= amount;
    }
}
