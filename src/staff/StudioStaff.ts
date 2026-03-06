import { StudioEmployee } from '../thirdparty/StudioEmployee';

export class StudioStaff {
    private plannedStaff: StudioEmployee[];

    constructor(actorsCollection: StudioEmployee[], cameramanCollection: StudioEmployee[]);
    constructor(plannedStaff: StudioEmployee[]);
    constructor(arg1: StudioEmployee[], arg2?: StudioEmployee[]) {
        if (Array.isArray(arg2)) {
            // Backward compatible path: accept separate groups and treat them uniformly
            this.plannedStaff = [...(arg1 || []), ...(arg2 || [])];
        } else {
            // Open for extension: accept any planned staff roles without modification
            this.plannedStaff = arg1 || [];
        }
    }

    getAllPlannedStaff(): StudioEmployee[] {
        return [...this.plannedStaff];
    }

    
    getTotalSalary(): number {
        return this.getAllPlannedStaff().reduce((sum, person) => sum + person.getSalary(), 0);
    }

    getSuperstars(): string[] {
        return this.getAllPlannedStaff()
            .filter(StudioStaff.isSuperstarCapable)
            .filter(person => person.getStarStatus())
            .map(person => person.getName());
    }

    private static isSuperstarCapable(person: StudioEmployee): person is StudioEmployee & { getStarStatus(): boolean } {
        const maybe = person as unknown as { getStarStatus?: unknown };
        return typeof maybe.getStarStatus === 'function';
    }
}
