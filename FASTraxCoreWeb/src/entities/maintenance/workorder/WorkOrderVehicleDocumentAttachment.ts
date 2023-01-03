import { BaseEntity } from "../../base";

export default interface WorkOrderVehicleDocumentAttachment extends BaseEntity {
    tempId: number;
    id: number;
    workOrderVehicleId: number;

    action: string;
    createdById: number;
    dateUploaded: Date;
    file: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    remarks: string;
}