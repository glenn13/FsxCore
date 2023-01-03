import { BaseEntity } from "@app/entities/base";
import Country from '@app/entities/catalog/Country';

export default interface PersonnelBankAccount extends BaseEntity {

    id: number;
    tempId: number;
    personnelId: number;
    accountHolderName: string;
    bankName: string;
    bankAddress: string;
    accountNumber: string;
    accountType: string;
    iban: string;
    swiftCode: string;
    countryId: number;
    effectivityDate: Date;
    isPrimaryAccount: boolean;
    country: Country | undefined;
}
