import { BaseEntity } from "../../../base";

export default interface DispositionComponentImage extends BaseEntity {
    tempId: number;
    id: number;
    dispositionComponentId: number;

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