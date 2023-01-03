import * as yup from 'yup';

export const newAssetColor = (): AssetColor => ({
    id: 0,
    code: '',
    title: '',
    description: '',
});

export const newAssetDepartment = (): AssetDepartment => ({
    id: 0,
    code: '',
    title: '',
    description: ''
});

export const newAssetGroup = (): AssetGroup => ({
    id: 0,
    code: '',
    title: '',
    description: '',
    assetCategoryId: 0,
    isActive: true
});

export const newAssetCategory = (): AssetCategory => ({
    id: 0,
    code: '',
    title: '',
    description: '',
});

export const newAssetManufacturer = (): AssetManufacturer => ({
    id: 0,
    title: '',
    assetTypeId: 0
});

export const newAssetType = (): AssetType => ({
    id: 0,
    code: '',
    title: '',
    description: '',
    assetCategoryId: 0,
    ssKM: 0,
    ssKMUnit: 0,
    ssWeek: 0,
    ssWeekUnit: 0,
});

export const newAssetModel = (): AssetModel => ({
    id: 0,
    code: '',
    title: '',
    description: '',
    assetManufacturerId: 0,
    forAid: false
});

export const newAssetOwnershipType = (): AssetOwnershipType => ({
    id: 0,
    code: '',
    title: '',
    description: '',
});

export const newAssetItemName = (): AssetItemName => ({
    id: 0,
    code: '',
    title: '',
    description: '',
    assetGroupId: 0,
    isActive: true
});
  
export const generalAssetGroupItemShape = {
    assetGroupId: yup.number().min(1, 'Priority Level is required.').required(),
    assetItemNameId: yup.number().min(1, 'Work Order Status is required.').required(),
    generalAssetGroupItemNo: yup.string().required('Group ID is required.') // Group ID refers to the reference no. for the grouping items / the grouping item no.
};




