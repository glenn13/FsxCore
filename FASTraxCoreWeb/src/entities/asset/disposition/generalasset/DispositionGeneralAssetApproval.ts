import { BaseEntity } from "../../../base";
import DispositionGeneralAsset from "./DispositionGeneralAsset";
import DispositionApprovalStatus from '../../standard-entries/DispositionApprovalStatus';
import { User } from "@app/entities/catalog";
import * as yup from 'yup';

export interface DispositionGeneralAssetApproval extends BaseEntity {
    tempId: number;
    dispositionGeneralAssetId: number;

    dateApproved: '';
    approverId: number;
    designationId?: number;

    dispositionApprovalStatusId: number;

    approver?: User;
    dispositionGeneralAsset?: DispositionGeneralAsset;
    dispositionApprovalStatus?: DispositionApprovalStatus;
}

export const dispositionGeneralAssetApprovalShape = {
    approverId: yup.number().min(1, 'Disposition Approver is required.'), 
    dispositionApprovalStatusId: yup.number().min(1, 'Disposition Approval Status is required.'),
    dateApproved: yup.string().nullable()
};

export const dispositionGeneralAssetApprovedShape = {
    approverId: yup.number().min(1, 'Disposition Approver is required.'), 
    dispositionApprovalStatusId: yup.number().min(1, 'Disposition Approval Status is required.'),
    dateApproved: yup.string().required('Disposition Approval Date is required.'),
};

export { DispositionGeneralAssetApproval as default};