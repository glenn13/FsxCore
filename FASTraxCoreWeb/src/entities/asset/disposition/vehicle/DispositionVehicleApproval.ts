import { BaseEntity } from "../../../base";
import DispositionVehicle from "./DispositionVehicle";
import DispositionApprovalStatus from '../../standard-entries/DispositionApprovalStatus';
import * as yup from 'yup';
import { User } from "@app/entities/catalog";

export interface DispositionVehicleApproval extends BaseEntity {
    tempId: number;
    dispositionVehicleId: number;

    dateApproved: '';
    approverId: number;
    designationId?: number;

    dispositionApprovalStatusId: number;

    approver?: User;
    dispositionVehicle?: DispositionVehicle;
    dispositionApprovalStatus?: DispositionApprovalStatus;
}

export const dispositionVehicleApprovalShape = {
    approverId: yup.number().min(1, 'Disposition Approver is required.'), 
    dispositionApprovalStatusId: yup.number().min(1, 'Disposition Approval Status is required.'),
    dateApproved: yup.string().nullable()
};

export const dispositionVehicleApprovedShape = {
    approverId: yup.number().min(1, 'Disposition Approver is required.'), 
    dispositionApprovalStatusId: yup.number().min(1, 'Disposition Approval Status is required.'),
    dateApproved: yup.string().required('Disposition Approval Date is required.'),
};

export { DispositionVehicleApproval as default};