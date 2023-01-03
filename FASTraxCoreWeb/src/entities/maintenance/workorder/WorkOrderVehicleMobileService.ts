import { BaseEntity } from "../../base";

export default interface WorkOrderVehicleMobileService extends BaseEntity {
    workOrderVehicleId: number;

    dateCompleted: Date;
    dateReceived: Date;
}