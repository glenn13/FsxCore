import { BaseEntity } from "../../base";
import MaintenanceDepartment from "../standard-entries/MaintenanceDepartment";
import MaintenanceLocation from "../standard-entries/MaintenanceLocation";
import { AssetUOM } from '@app/entities/asset/standard-entries/AssetUOM';

export default interface WorkOrderBOMMaterial extends BaseEntity {
    tempId: number;
    workOrderBOMId: number;

    costPrice: number;
    dateIssued?: Date;
    description: string;
    etd?: Date;
    isApproved: boolean;
    isChargeable: boolean;
    isIssued: boolean;
    isOldPartReturned: boolean;
    maintenanceDepartmentId: number;
    maintenanceLocationId: number;
    markUp: number;
    partNo: string;
    priceGroup: number;
    quantity: number;
    referencePONumber: string;
    referenceSSRNumber: string;
    remarks: string;
    reservedQuantity: number;
    salesPrice: number;
    total: number;
    assetUOMId: number;

    maintenanceDepartment?: MaintenanceDepartment;
    maintenanceLocation?: MaintenanceLocation;
    assetUOM?: AssetUOM;
}