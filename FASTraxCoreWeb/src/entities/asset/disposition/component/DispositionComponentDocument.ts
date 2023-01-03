import { BaseEntity } from "../../../base";

export default interface DispositionComponentDocument extends BaseEntity{
    tempId: number;
    id: number;
    dispositionComponentId: number;

    action: string;
    createdById: number;
    dateUploaded: Date;
    file: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    remarks: string;
}