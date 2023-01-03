import { BaseEntity } from "../../../base";

export default interface DispositionVehicleDocument extends BaseEntity{
    tempId: number;
    id: number;
    dispositionVehicleId: number;

    action: string;
    createdById: number;
    dateUploaded: Date;
    file: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    remarks: string;
}
