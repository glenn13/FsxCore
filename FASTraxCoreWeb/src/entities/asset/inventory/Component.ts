import * as yup from 'yup';
import {User} from '../../catalog/User';
import {assetShape, newAsset} from './Asset';
import ComponentLinkedAsset from './ComponentLinkedAsset';
import {Asset} from '@app/entities/asset/inventory/Asset';
import ComponentWarrantyDetail from './ComponentWarrantyDetail';
import ComponentAttachmentImage from './ComponentAttachmentImage';
import ComponentAttachmentDocument from './ComponentAttachmentDocument';
import ComponentRegistrationDetail from './ComponentRegistrationDetail';
import {ComponentDepreciationDetail} from './ComponentDepreciationDetail';

export const newComponent = (): Component => ({
    ...newAsset(),
    assignedToId: 0,
    assetDepartmentId: 0
});


export interface Component extends Asset {
    assetDepartmentId: number;
    assignedToId: number;

    assetDepartment?: AssetDepartment;
    assignedTo?: User;

    componentLinkedAssets?: ComponentLinkedAsset[];
    componentWarrantyDetails?: ComponentWarrantyDetail[];
    componentAttachmentImages?: ComponentAttachmentImage[];
    componentAttachmentDocuments?: ComponentAttachmentDocument[];
    componentRegistrationDetails?: ComponentRegistrationDetail[];
    componentDepreciationDetails?: ComponentDepreciationDetail[];
}

export const componentShape = {
  ...assetShape,
  assetDepartmentId: yup.number().min(1, 'Department is required'),
  assignedToId: yup.number().min(1, 'Assigned To is required'),
};
