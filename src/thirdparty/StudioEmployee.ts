export class StudioEmployee {
    name: string;
    salary: number;
    earnedMoney: number;

    isPerformer: boolean;

    constructor(name: string, initialSalary: number) {
        this.name = name;
        this.salary = initialSalary;
        this.earnedMoney = 0;
        this.isPerformer = false;
    }

    getEarnedMoney() {
        return this.earnedMoney;
    }

    getName() {
        return this.name;
    }

    getSalary() {
        return this.salary;
    }

    paySalary(paidSum: number) {
        this.earnedMoney += paidSum;
    }

    getPrintRepresentation(): string {
        return `${this.constructor.name}: '${this.name}', earned money: ${this.earnedMoney}, salary: ${this.salary}`;
    }

    getRole(): string {
        return this.constructor.name;
    }
}
