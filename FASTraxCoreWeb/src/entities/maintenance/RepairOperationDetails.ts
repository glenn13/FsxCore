import { BaseEntity } from "../base";

export default interface RepairOperationDetails extends BaseEntity {
    tempId: number;
    repairOperationActionId: number;
    repairOperationId: number;
    repairGroupId: number;
    repairSubGroupId: number;
    repairOperationSRO: string;
    repairOperation: string;
    hours: number;
    salesPrice: number;
    serviceType: string;
    repairAction: string;
    repairLevel: string;
    checked: boolean;
    selected: boolean;
}