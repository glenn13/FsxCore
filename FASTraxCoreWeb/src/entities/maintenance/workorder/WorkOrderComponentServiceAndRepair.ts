import { BaseEntity } from "../../base";

export default interface WorkOrderComponentServiceAndRepair extends BaseEntity {
    tempId: number;
    workOrderComponentId: number;

    actualHours: number;
    concerns: string;
    correction: string;
    estimatedHours: number;
    findings: string;
    markUp: number;
    repairOperationActionComponentId: number;
    salesPrice: string;
    unitCost: number;
    useActualHours: number;
}