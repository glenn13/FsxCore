import { BaseEntity } from "@app/entities/base";
import Country from '@app/entities/catalog/Country';

export default interface PersonnelWorkOtherClearance extends BaseEntity {

    id: number;
    tempId: number;
    personnelId: number;
    documentName: string;
    documentNo: string;
    dateIssued: Date;
    countryId: number;
    dateExpiry: Date;
    fileName: string;
    fileSize: number;
    image: string;
    imageType: string;
    remarks: string;
    country: Country | undefined;
    isActive: boolean;
}
