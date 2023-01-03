import { BaseEntity } from "../../base";

export default interface WorkOrderComponentDate extends BaseEntity {
    workOrderComponentId: number;

    dateClosed?: Date;
    dateETC?: Date;
    dateIssued?: Date;
    dateReleased?: Date;
}