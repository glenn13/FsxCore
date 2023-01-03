import { BaseEntity } from "../../base";

export default interface WorkOrderBOMImageAttachment extends BaseEntity {
    tempId: number;
    id: number;
    workOrderBOMId: number;

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