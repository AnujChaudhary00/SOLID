import { Performer } from './StaffRoles';
import { StudioEmployee } from '../thirdparty/StudioEmployee';
import { Salaries } from '../thirdparty/Salaries';

export class Actor extends StudioEmployee implements Performer {
    private isSuperStar: boolean;

    constructor(name: string, isSuperStar: boolean) {
        super(name, Salaries.ACTOR);
        this.isSuperStar = isSuperStar;
        this.isPerformer = true;
    }

    getStarStatus(): boolean {
        return this.isSuperStar;
    }

    act(): boolean {
        const generalSuccessChance = Math.random() > 0.04;
        const superStarSuccessChance = Math.random() > 0.01;
        return this.isSuperStar ? superStarSuccessChance : generalSuccessChance;
    }

    shoot(): boolean {
        return true;
    }

    getPrintRepresentation(): string {
        const role = this.isSuperStar ? 'Actor (superstar)' : 'Actor';
        return `${role}: '${this.getName()}', earned money: ${this.getEarnedMoney()}, salary: ${this.getSalary()}`;
    }
}
