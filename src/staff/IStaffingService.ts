import { IStaffInformation } from './IStaffInformation';
import { IStaffHiring } from './IStaffHiring';

export interface IStaffingService extends IStaffInformation, IStaffHiring {
    // Composite interface - no additional methods needed
}
