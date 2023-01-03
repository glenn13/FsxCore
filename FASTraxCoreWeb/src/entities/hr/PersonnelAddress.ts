import { BaseEntity } from "@app/entities/base";
import Country from '@app/entities/catalog/Country';

export default interface PersonnelAddress extends BaseEntity {

    id: number;
    tempId: number;
    personnelId: number;
    address: string;
    city: string;
    countryId: number;
    zipCode: string;
    country: Country | undefined;
}
