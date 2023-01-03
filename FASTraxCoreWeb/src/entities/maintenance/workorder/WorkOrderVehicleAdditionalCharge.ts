import { BaseEntity } from "../../base";
import { AssetUOM } from '@app/entities/asset/standard-entries/AssetUOM';
import ApprovalStatus from "../standard-entries/ApprovalStatus";

export default interface WorkOrderVehicleAdditionalCharge extends BaseEntity {
    tempId: number;
    workOrderVehicleId: number;

    approvalStatusId: number;
    description: string;
    quantity: number;
    remarks: string;
    salesPrice: number;
    totalSalesPrice: number;
    assetUOMId: number;
    
    approvalStatus?: ApprovalStatus;
    assetUOM?: AssetUOM;
}