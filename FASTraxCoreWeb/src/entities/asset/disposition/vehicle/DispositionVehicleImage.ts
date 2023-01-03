import { BaseEntity } from "../../../base";

export default interface DispositionVehicleImage extends BaseEntity {
    tempId: number;
    id: number;
    dispositionVehicleId: number;

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