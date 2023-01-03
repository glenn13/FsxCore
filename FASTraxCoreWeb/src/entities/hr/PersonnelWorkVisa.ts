import { BaseEntity } from "@app/entities/base";
import Country from '@app/entities/catalog/Country';

export default interface PersonnelWorkVisa extends BaseEntity {

    id: number;
    tempId: number;
    personnelId: number;
    documentNo: string;
    dateIssued: Date;
    dateEntry: Date;
    countryId: number;
    dateExpiry: Date;
    dateRenewal: Date;
    isActive: boolean;
    fileName: string;
    fileSize: number;
    image: string;
    imageType: string;
    remarks: string | undefined;
    country: Country | undefined;
}
