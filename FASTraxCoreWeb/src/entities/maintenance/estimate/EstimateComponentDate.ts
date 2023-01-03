import { BaseEntity } from './../../base';

export default interface EstimateComponentDate extends BaseEntity {
    estimateComponentId: number;

    dateApprovedDeclined?: Date;
    dateClosed?: Date;
    dateCreated: Date;
    dateSubmittedForApproval?: Date;
}
