import { BaseEntity } from "@app/entities/base";
import Country from '@app/entities/catalog/Country';
import Personnel from '@app/entities/hr/Personnel';
import Status from '@app/entities/hr/standard-entries/Status'
import HumanResourceContractType from '@app/entities/hr/standard-entries/HumanResourceContractType'

export default interface PersonnelWorkInformation extends BaseEntity {

    id: number;
    tempId: number;
    personnelId: number;
    humanResourceStatusId: number;
    contractTypeId: number;
    contractStartDate: Date;
    contractEndDate: Date;
    employmentStartDate: Date;
    lastWorkingDate: Date | undefined;
    basicPay: string;
    jobStatusNotes: string;
    isBlacklisted: boolean;
    reportingToPersonnelId: number;

    personnel: Personnel | undefined;
    humanResourceStatus: Status | undefined;
    humanReourceContractType: HumanResourceContractType | undefined;

}
