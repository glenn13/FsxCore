import { BaseEntity } from "@app/entities/base";
import Country from '@app/entities/catalog/Country';

export default interface PersonnelWorkPermit extends BaseEntity {

    id: number;
    tempId: number;
    personnelId: number;
    documentNo: string;
    description: string;
    dateEntry: Date;
    countryId: number;
    dateExpiry: Date;
    dateRenewal: Date;
    // attachment: string | undefined;
    // remarks: string | undefined;
    isActive: boolean;
    fileName: string;
    fileSize: number;
    image: string;
    imageType: string;
    country: Country | undefined;
}
