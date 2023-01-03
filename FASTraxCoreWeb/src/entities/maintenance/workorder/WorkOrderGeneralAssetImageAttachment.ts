import { BaseEntity } from "../../base";

export default interface WorkOrderGeneralAssetImageAttachment extends BaseEntity {
    tempId: number;
    id: number;
    workOrderGeneralAssetId: number;

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