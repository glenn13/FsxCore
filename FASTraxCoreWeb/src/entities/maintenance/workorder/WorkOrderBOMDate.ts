import { BaseEntity } from "../../base";

export default interface WorkOrderBOMDate extends BaseEntity {
    workOrderBOMId: number;

    dateClosed?: Date;
    dateETC?: Date;
    dateIssued?: Date;
    dateReleased?: Date;
}