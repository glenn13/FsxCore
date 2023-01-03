import { BaseEntity } from "../../base";

export default interface EstimateSummary extends BaseEntity {
    assetCategoryId: number;
    assetId: number;
    assetRefId: string;
    createdBy: string;
    dateRaised: Date;
    estimationNumber: string;
    estimationStatus: string;
    estimationType: string;
    lastUpdate: Date;
    maintenanceDepartment: string;
    maintenanceLocation: string;
    serialNo: string;
    vin: string;
    vinSerialNo: string;
}