import { BaseEntity } from './../../base';

export default interface EstimateVehicleDate extends BaseEntity {
    estimateVehicleId: number;

    dateApprovedDeclined?: Date;
    dateClosed?: Date;
    dateCreated: Date;
    dateSubmittedForApproval?: Date;
}
