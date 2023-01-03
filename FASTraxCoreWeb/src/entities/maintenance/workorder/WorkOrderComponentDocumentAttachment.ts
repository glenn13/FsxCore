import { BaseEntity } from "../../base";

export default interface WorkOrderComponentDocumentAttachment extends BaseEntity {
    tempId: number;
    id: number;
    workOrderComponentId: number;

    action: string;
    createdById: number;
    dateUploaded: Date;
    file: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    remarks: string;
}