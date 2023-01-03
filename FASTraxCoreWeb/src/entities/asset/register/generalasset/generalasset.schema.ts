import * as yup from 'yup';
import { AssetCategoryEnum } from '@app/helpers/asset/enum';
import { generateNegativeNumber, generateUUID } from '@app/helpers/randoms';

export const newGeneralAsset = (): GeneralAsset => ({
    id: 0,
    projectSiteId: 0,
    assetCategoryId: Number(AssetCategoryEnum.GeneralAsset),
    assetColorId: 0,
    assetDepartmentId: 0,
    assetGroupId: 0,
    assetItemNameId: 0,
    assetManufacturerId: 0,
    assetModelId: 0,
    assetModelYear: undefined,
    assetOwnershipTypeId: 0,
    assetStatusId: 0,
    assetTypeId: 0,
    assetUOMId: 0,
    assignedToId: 0,
    assetRefId: generateUUID(true).toUpperCase(),
    dateRegistered: undefined,
    description: '',
    inventoryDate: undefined,
    lastServiceDate: undefined,
    nextServiceDate: undefined,
    maintenanceStatusId: undefined,
    serialNo: '',
    series: '',
    createdByUserId: 0,
    generalAssetPurchase: newGeneralAssetPurchase(),
    generalAssetDepreciation: newGeneralAssetDepreciation(),
    generalAssetOwnership: newGeneralAssetOwnership(),
    
}

);

export const newGeneralAssetDepreciation = (): GeneralAssetDepreciation => ({
    id: 0,
    depreciationMethodId: undefined,
    depreciationPeriodTypeId: undefined, //Number(DepreciationPeriodTypeEnum.Monthly),
    generalAssetId: 0,
    residualValue: 0,
    usefulLife: 0
});

export const newGeneralAssetDepreciationDetail = (tempIds?: number[]): GeneralAssetDepreciationDetail => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    generalAssetDepreciationId: 0,
    depreciationPeriod: new Date(),
    depreciationAmount: 0,
    depreciationRate: 0,
    purchaseCost: 0,
    residualCost: 0,
    usefulLife: 0,
});

export const newGeneralAssetDocumentAttachment = (tempIds?: number[]): GeneralAssetDocumentAttachment => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    action: '',
    dateUploaded: new Date(),
    file: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    generalAssetId: 0,
    remarks: '',
});

export const newGeneralAssetImageAttachment = (tempIds?: number[]): GeneralAssetImageAttachment => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    dateUploaded: new Date(),
    fileName: '',
    fileSize: 0,
    generalAssetId: 0,
    image: '',
    imageType: '',
    isDefault: false,
    isPrintable: false,
    orientation: '',
    remarks: '',
});

export const newGeneralAssetLinkedAsset = (tempIds?: number[]): GeneralAssetLinkedAsset => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    generalAssetId: 0,
    linkedGeneralAssetId: 0,
    assetRefId: '',
    serialNo: '',
    maintenanceStatus: '',
    hireStatus: '',
    processedBy: '',
    dateLinked: new Date(),
});

export const newGeneralAssetOwnership = (): GeneralAssetOwnership => ({
    id: 0,
    purchasedBy: '',
    customerCode: ''
});

export const newGeneralAssetPurchase = (): GeneralAssetPurchase => ({
    id: 0,
    acquisitionAmount: 0,
    acquisitionDate: new Date(),
    assetStateId: 0, // need to set to undefined the value and the property type if it is not a mandatory field
    generalAssetId: 0,
    otherCharges: 0,
    paymentTypeId: 0,
    referencePONo: '',
    shippingCharges: 0,
    supplier: '',
    taxCharges: 0,
    totalAcquisitionAmount: 0
})

export const newGeneralAssetRegistrationDetail = (tempIds?: number[]): GeneralAssetRegistrationDetail => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    generalAssetId: 0,
    placeOfRegistration: '',
    referenceNo: '',
    registeredTo: ''
});

export const newGeneralAssetWarrantyDetail = (tempIds?: number[]): GeneralAssetWarrantyDetail => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    generalAssetId: 0,
    referenceNo: '',
    registeredTo: '',
    warrantyProvider: '',
    warrantyTypeId: 0,
    warrantyType: '',
});

/**
 * Modifying any property on the shapes, need to adjust as well in API.
 * Please take note as well when the combo box is not mandatory and the value of an property id (e.g. assetModelYearId) is 0,
 * it will create an error regarding on the foreign key and the transaction will not proceed for saving.
 * 
 * Need to set to undefined the value and the property type if it is not a mandatory field especially for those foreign key column
 * **/
export const generalAssetShape = {
    assetColorId: yup.number().min(1, 'Color is required'),
    assetDepartmentId: yup.number().min(1, 'Department is required.'),
    assetGroupId: yup.number().min(1, 'Asset Group is required').required(),
    assetItemNameId: yup.number().min(1, 'Asset Item Name is required').required(),
    assetManufacturerId: yup.number().min(1, 'Manufacturer is required').required(),
    assetModelId: yup.number().min(1, 'Model is required').required(),
    assetModelYear: yup.date().required('Model Year is required'),
    assetOwnershipTypeId: yup.number().min(1, 'Ownership Type is required').required(),
    assetRefId: yup.string().required('Asset Reference Id is required'),
    generalAssetPurchase : yup.object().shape({
        assetStateId: yup.number().min(1, 'Asset State is required').required(),
        paymentTypeId: yup.number().min(1, 'Payment Type is required').required(),
    }),
    assetStatusId: yup.number().min(1, 'Asset Status is required').required(),
    assetTypeId: yup.number().min(1, 'Asset Type is required').required(),
    assetUOMId: yup.number().min(1, 'Unit Type is required').required(),
    assignedToId: yup.number().min(1, 'Assigned Person is required')
};
