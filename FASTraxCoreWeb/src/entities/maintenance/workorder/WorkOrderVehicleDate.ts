import { BaseEntity } from "../../base";

export default interface WorkOrderVehicleDate extends BaseEntity {
    workOrderVehicleId: number;

    dateClosed?: Date;
    dateETC?: Date;
    dateIssued?: Date;
    dateReleased?: Date;
}