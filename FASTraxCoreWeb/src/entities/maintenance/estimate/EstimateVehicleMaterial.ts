import { BaseEntity } from "../../base";
import MaintenanceDepartment from "../standard-entries/MaintenanceDepartment";
import { AssetUOM } from '@app/entities/asset/standard-entries/AssetUOM';
import MaintenanceLocation from "../standard-entries/MaintenanceLocation";

export default interface EstimateVehicleMaterial extends BaseEntity {
    tempId: number;
    estimateVehicleId: number;

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