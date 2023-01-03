import { BaseEntity } from "@app/entities/base";
import Country from '@app/entities/catalog/Country';

export default interface PersonnelImageAttachment extends BaseEntity {

    id: number;
    tempId: number;
    personnelId: number;
    fileName: string;
    fileSize: number;
    image: string;
    imageType: string;
    remarks: string | undefined;
    orientation: string;
    dateUploaded: Date;
    isPrintable: boolean;
    isDefault: boolean;
}
