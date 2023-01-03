import { BaseEntity } from "../../base";

export default interface WorkOrderBOMDocumentAttachment extends BaseEntity {
    tempId: number;
    id: number;
    workOrderBOMId: number;

    action: string;
    createdById: number;
    dateUploaded: Date;
    file: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    remarks: string;
}