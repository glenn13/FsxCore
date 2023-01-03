import { BaseEntity } from "../../base";
import MaintenanceDepartment from "../standard-entries/MaintenanceDepartment";

export default interface WorkOrderComponentLabour extends BaseEntity {
    tempId: number;
    workOrderComponentId: number;
    datePerformed: Date;
    hour: number;
    isOJT: boolean;
    isReWork: boolean;
    maintenanceDepartmentId: number;
    remarks: string;
    serviceCode: string;
    timeIn: Date;
    timeOut: Date;
    maintenanceDepartment?: MaintenanceDepartment;
    //personnel: Personnel;
}