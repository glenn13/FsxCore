
import { AssetCategoryEnum } from "@app/helpers/asset/enum";
import { generateNegativeNumber, generateUUID } from "@app/helpers/randoms";
import * as yup from 'yup';

export const newComponent = (): Component => ({
    id: 0,
    projectSiteId: 0,
    assetCategoryId: Number(AssetCategoryEnum.Component),
    assetColorId: 0,
    assetDepartmentId: 0,
    assetManufacturerId: 0,
    assetModelId: 0,
    assetModelYear: undefined,
    assetName: '',
    assetOwnershipTypeId: 0,
    assetRefId: generateUUID(true).toUpperCase(),
    assetStatusId: 0,
    assetTypeId: 0,
    assignedToId: 0,
    dateRegistered: undefined,
    description: '',
    inventoryDate: undefined,
    lastServiceDate: undefined,
    nextServiceDate: undefined,
    maintenanceStatusId: undefined,
    serialNo: '',
    series: '',
    createdByUserId: 0,

    componentPurchase: newComponentPurchase(),
    componentDepreciation: newComponentDepreciation(),
    componentOwnership: newComponentOwnership(),
});


export const newComponentDepreciation = (tempIds?: number[]): ComponentDepreciation => ({
    id: 0,
    componentId: 0,
    depreciationMethodId: undefined,
    depreciationPeriodTypeId: undefined,
    residualValue: 0,
    usefulLife: 0
});

export const newComponentDepreciationDetail = (tempIds?: number[]): ComponentDepreciationDetail => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    componentDepreciationId: 0,
    depreciationAmount: 0,
    depreciationPeriod: undefined,
    depreciationRate: 0,
    purchaseCost: 0,
    residualCost: 0,
    usefulLife: 0,
});

export const newComponentDocumentAttachment = (tempIds?: number[]): ComponentDocumentAttachment => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    action: '',
    componentId: 0,
    dateUploaded: new Date(),
    file: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    remarks: '',
});

export const newComponentImageAttachment = (tempIds?: number[]): ComponentImageAttachment => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    componentId: 0,
    dateUploaded: new Date(),
    fileName: '',
    fileSize: 0,
    image: '',
    imageType: '',
    isDefault: false,
    isPrintable: false,
    orientation: '',
    remarks: '',
});

export const newComponentOwnership = (): ComponentOwnership => ({
    id: 0,
    purchasedBy: '',
    customerCode: ''
});

export const newComponentPurchase = (): ComponentPurchase => ({
    id: 0,
    acquisitionAmount: 0,
    acquisitionDate: undefined,
    assetStateId: 0,
    componentId: 0,
    otherCharges: 0,
    paymentTypeId: 0,
    referencePONo: '',
    shippingCharges: 0,
    supplier: '',
    taxCharges: 0,
    totalAcquisitionAmount: 0,
});

export const newComponentRegistrationDetail = (tempIds?: number[]): ComponentRegistrationDetail => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    componentId: 0,
    expiryDate: undefined,
    licenseNo: '',
    placeOfRegistration: '',
    referenceNo: '',
    registeredTo: '',
    registrationDate: undefined,
});

export const newComponentWarrantyDetail = (tempIds?: number[]): ComponentWarrantyDetail => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    componentId: 0,
    expiryDate: undefined,
    referenceNo: '',
    registeredTo: '',
    startDate: undefined,
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
export const componentShape = {
    assetColorId: yup.number().min(1, 'Color is required'),
    assetDepartmentId: yup.number().min(1, 'Department is required'),
    assetManufacturerId: yup.number().min(1, 'Manufacturer is required').required(),
    assetModelId: yup.number().min(1, 'Model is required').required(),
    assetModelYear: yup.date().required('Model Year is required'),
    assetName: yup.string().required('Asset Name is required'),
    assetOwnershipTypeId: yup.number().min(1, 'Ownership Type is required').required(),
    assetRefId: yup.string().required('Asset Reference Id is required'),
    componentPurchase : yup.object().shape({
        assetStateId: yup.number().min(1, 'Asset State is required').required(),
        paymentTypeId: yup.number().min(1, 'Payment Type is required').required(),
    }),
    assetStatusId: yup.number().min(1, 'Asset Status is required').required(),
    assetTypeId: yup.number().min(1, 'Asset Type is required').required(),
    assignedToId: yup.number().min(1, 'Assigned Person is required')
};
