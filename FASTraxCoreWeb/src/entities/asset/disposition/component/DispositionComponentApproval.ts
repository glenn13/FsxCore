import { BaseEntity } from "../../../base";
import DispositionComponent from "./DispositionComponent";
import DispositionApprovalStatus from '../../standard-entries/DispositionApprovalStatus';
import * as yup from 'yup';
import { User } from "@app/entities/catalog";

export interface DispositionComponentApproval extends BaseEntity {
    tempId: number;
    dispositionComponentId: number;

    dateApproved: '';
    approverId: number;
    designationId?: number;

    dispositionApprovalStatusId: number;

    approver?: User;
    dispositionComponent?: DispositionComponent;
    dispositionApprovalStatus?: DispositionApprovalStatus;
}

export const dispositionComponentApprovalShape = {
    approverId: yup.number().min(1, 'Disposition Approver is required.'), 
    dispositionApprovalStatusId: yup.number().min(1, 'Disposition Approval Status is required.'),
    dateApproved: yup.string().nullable()
};

export const dispositionComponentApprovedShape = {
    approverId: yup.number().min(1, 'Disposition Approver is required.'), 
    dispositionApprovalStatusId: yup.number().min(1, 'Disposition Approval Status is required.'),
    dateApproved: yup.string().required('Disposition Approval Date is required.'),
};

export { DispositionComponentApproval as default};