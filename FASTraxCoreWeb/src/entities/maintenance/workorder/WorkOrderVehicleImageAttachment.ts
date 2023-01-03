import { BaseEntity } from "../../base";

export default interface WorkOrderVehicleImageAttachment extends BaseEntity {
    tempId: number;
    id: number;
    workOrderVehicleId: number;

    createdById: number;
    dateUploaded: Date;
    fileName: string;
    fileSize: number;
    image: string;
    imageType: string;
    isDefault: boolean;
    isPrintable: boolean;
    remarks: string;
}