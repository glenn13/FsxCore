import { BaseEntity } from './../../base';

export default interface EstimateGeneralAssetDate extends BaseEntity {
    estimateGeneralAssetId: number;

    dateApprovedDeclined?: Date;
    dateClosed?: Date;
    dateCreated: Date;
    dateSubmittedForApproval?: Date;
}
