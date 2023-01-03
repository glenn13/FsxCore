import { BaseEntity } from "../../base";

export default interface WorkOrderComponentImageAttachment extends BaseEntity {
    tempId: number;
    id: number;
    workOrderComponentId: number;

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