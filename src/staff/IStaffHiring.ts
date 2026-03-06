import { StudioEmployee } from '../thirdparty/StudioEmployee';
import { StudioStaff } from './StudioStaff';


export interface IStaffHiring {

    hireNewStaff(...persons: StudioEmployee[]): void;

    hireNewStaffFromStudioStaff(movieStaff: StudioStaff): void;
}
