import { IRecruiter } from './IRecruiter';
import { RoleFactory } from './RoleFactory';
import { StudioEmployee } from '../thirdparty/StudioEmployee';
import { Salaries } from '../thirdparty/Salaries';
import { NoSuchProfession } from '../thirdparty/NoSuchProfession';

export class Recruiter extends StudioEmployee implements IRecruiter {
    constructor(name: string) {
        super(name, Salaries.RECRUITER);
    }

    hire(name: string, personType: string): StudioEmployee | null {
        const created = RoleFactory.create(personType, name);
        if (created === null) {
            throw new NoSuchProfession(personType);
        }
        return created as StudioEmployee;
    }

    getPrintRepresentation(): string {
        return `Recruiter: '${this.getName()}', earned money: ${this.getEarnedMoney()}, salary: ${this.getSalary()}`;
    }
}
