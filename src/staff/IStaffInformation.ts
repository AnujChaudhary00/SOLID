import { StudioEmployee } from '../thirdparty/StudioEmployee';
import { Performer } from './StaffRoles';

export interface IStaffInformation {
   
    getStaff(): StudioEmployee[];


    getPerformers(): (StudioEmployee & Performer)[];

    getTotalSalary(): number;
}
