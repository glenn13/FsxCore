import * as yup from 'yup';

import {User} from '../../catalog/User';
import {assetShape, newAsset} from './Asset';
import GeneralAssetGroup from './GeneralAssetGroup';
//import GeneralLinkedAsset from './GeneralLinkedAsset';
import {Asset} from '@app/entities/asset/inventory/Asset';
//import GeneralWarrantyDetail from './GeneralWarrantyDetail';
//import GeneralAttachmentImage from './GeneralAttachmentImage';

//import GeneralRegistrationDetail from './GeneralRegistrationDetail';
import { AssetCategoryEnum } from '@app/helpers/asset/enum'


export const newGeneralAsset = (): GeneralAsset => ({
    ...newAsset(),
    assetCategoryId: AssetCategoryEnum.GeneralAsset,
    generalAssetNameId: 0,
    generalAssetGroupId: 0,
    assetDepartmentId: 0,
    assignedToId: 0
});

export interface GeneralAsset extends Asset {
    assetCategoryId: number;
    assetDepartmentId: number;
    assignedToId: number;
    generalAssetNameId?: number;
    generalAssetGroupId?: number;

    assetDepartment?: AssetDepartment;
    assignedTo?: User;

    generalAssetGroup?: GeneralAssetGroup;
    //generalLinkedAssets?: GeneralLinkedAsset[];
    //generalWarrantyDetails?: GeneralWarrantyDetail[];
    //generalAttachmentImages?: GeneralAttachmentImage[];
   // generalAttachmentDocuments?: GeneralAttachmentDocument[];
    //generalRegistrationDetails?: GeneralRegistrationDetail[];
}

export const generalAssetShape = {
    ...assetShape,
    departmentId: yup.number().min(1, 'Department is required.'),
    assignedToId: yup.number().min(1, 'Assigned is required'),
    generalAssetGroupId: yup.number().min(1, 'General Asset Group is required').required(),
};
