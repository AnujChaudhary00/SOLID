import { Performer } from './StaffRoles';
import { StudioEmployee } from '../thirdparty/StudioEmployee';
import { Salaries } from '../thirdparty/Salaries';

export class CameraMan extends StudioEmployee implements Performer {

    constructor(name: string) {
        super(name, Salaries.CAMERA_MAN);
        this.isPerformer = true;
    }

    act(): boolean {
        return true;
    }

    shoot(): boolean {
        return Math.random() > 0.04;
    }

    getPrintRepresentation(): string {
        return `Cameraman: '${this.getName()}', earned money: ${this.getEarnedMoney()}, salary: ${this.getSalary()}`;
    }
}
