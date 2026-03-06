import { StudioStaff } from './StudioStaff';
import { StudioEmployee } from '../thirdparty/StudioEmployee';
import { IStaffingService } from './IStaffingService';
import { Performer } from './StaffRoles';

export class StaffingService implements IStaffingService {
    private staff: StudioEmployee[];

    constructor() {
        this.staff = [];
    }

    hireNewStaff(...persons: StudioEmployee[]): void {
        this.staff = [...persons];
    }

    hireNewStaffFromStudioStaff(movieDefinition: StudioStaff): void {
        this.staff = [...this.staff, ...movieDefinition.getAllPlannedStaff()];
    }

    getStaff(): StudioEmployee[] {
        return this.staff;
    }

    getPerformers(): (StudioEmployee & Performer)[] {
        return this.staff.filter(this.isPerformer);
    }

    private isPerformer(person: StudioEmployee): person is StudioEmployee & Performer {
        // Prefer capability check over a data flag.
        const maybe = person as unknown as Partial<Performer>;
        return typeof maybe.act === 'function' && typeof maybe.shoot === 'function';
    }


    getTotalSalary(): number {
        return this.staff.reduce((sum, person) => sum + person.getSalary(), 0);
    }
}
