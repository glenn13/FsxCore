import { BaseEntity } from "../../base";

export default interface WorkOrderGeneralAssetMobileService extends BaseEntity {
    workOrderGeneralAssetId: number;

    dateCompleted: Date;
    dateReceived: Date;
}