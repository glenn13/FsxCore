import { BaseEntity } from "../../base";

export default interface WorkOrderSummary extends BaseEntity {
    assetCategoryId: number;
    assetId: number;
    assetRefId: string;
    maintenanceDepartment: string;
    maintenanceLocation: string;
    vinSerialNo: string;
    woDateIssued: Date;
    workOrderCategoryTypeId: number;
    workOrderNo: string;
    workOrderStatus: string;
    workOrderType: string;
}