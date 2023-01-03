import { BaseEntity } from "../../base";

export default interface WorkOrderGeneralAssetDocumentAttachment extends BaseEntity {
    tempId: number;
    id: number;
    workOrderGeneralAssetId: number;

    action: string;
    createdById: number;
    dateUploaded: Date;
    file: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    remarks: string;
}