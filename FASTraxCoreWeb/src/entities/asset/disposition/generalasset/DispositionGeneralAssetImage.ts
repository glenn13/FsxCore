import { BaseEntity } from "../../../base";

export default interface DispositionGeneralAssetImage extends BaseEntity {
    tempId: number;
    id: number;
    dispositionGeneralAssetId: number;

    dateUploaded: Date;
    fileName: string;
    fileSize: number;
    image: string;
    imageType: string;
    isDefault: boolean;
    isPrintable: boolean;
    orientation: string;
    remarks: string;
}