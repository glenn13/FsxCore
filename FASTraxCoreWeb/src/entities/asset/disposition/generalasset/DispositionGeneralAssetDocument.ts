import { BaseEntity } from "../../../base";
export default interface DispositionGeneralAssetDocument extends BaseEntity {
    tempId: number;
    id: number;
    dispositionGeneralAssetId: number;

    action: string;
    createdById: number;
    dateUploaded: Date;
    file: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    remarks: string;
}
