import { BaseEntity } from "../../base";

export default interface WorkOrderComponentMobileService extends BaseEntity {
    workOrderComponentId: number;

    dateCompleted: Date;
    dateReceived: Date;
}