import { Payer } from './StaffRoles';
import { BudgetIsOverException } from '../thirdparty/BudgetIsOverException';
import { FinancialService } from '../thirdparty/FinancialService';
import { StudioEmployee } from '../thirdparty/StudioEmployee';
import { Salaries } from '../thirdparty/Salaries';

export class Accountant extends StudioEmployee implements Payer {
    constructor(name: string) {
        super(name, Salaries.ACCOUNTANT);
    }

    pay(person: StudioEmployee, financialService: FinancialService): void {
        financialService.paySalaryToEmployee(person);
    }

    getPrintRepresentation(): string {
        return `Accountant: '${this.getName()}', earned money: ${this.getEarnedMoney()}, salary: ${this.getSalary()}`;
    }
}
