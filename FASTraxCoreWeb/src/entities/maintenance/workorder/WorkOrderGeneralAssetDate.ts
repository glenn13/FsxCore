import { BaseEntity } from "../../base";

export default interface WorkOrderGeneralAssetDate extends BaseEntity {
    workOrderGeneralAssetId: number;

    dateClosed?: Date;
    dateETC?: Date;
    dateIssued?: Date;
    dateReleased?: Date;
}