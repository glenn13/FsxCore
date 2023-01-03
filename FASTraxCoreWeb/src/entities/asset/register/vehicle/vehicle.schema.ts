import { AssetCategoryEnum } from '@app/helpers/asset/enum';
import { DepreciationMethodEnum, DepreciationPeriodTypeEnum } from '@app/helpers/finance/enum';
import { generateNegativeNumber, generateUUID } from '@app/helpers/randoms';
import * as yup from 'yup';

export const newVehicle = (): Vehicle => ({
    id: 0,
    assetCategoryId: Number(AssetCategoryEnum.Vehicle),
    assetColorId: 0,
    assetColor: '',
    assetLocationId: 0,
    assetManufacturerId: 0,
    assetManufacturer: '',
    assetModelId: 0,
    assetModel: '',
    assetModelYear: undefined,
    assetName: '',
    assetOwnershipTypeId: 0,
    assetRefId: generateUUID(true).toUpperCase(),
    assetStatusId: 0,
    assetStatus: '',
    assetTypeId: 0,
    assetType: '',
    dateRegistered: undefined,
    description: '',
    doorCount: 0,
    fuelTankSizeId: undefined,
    inventoryDate: undefined,
    lastServiceDate: undefined,
    nextServiceDate: undefined,
    maintenanceStatusId: undefined,
    maintenanceStatus: '',
    maxCapacity: 0,
    pickUpDate: undefined,
    projectSiteId: 0,
    series: '',
    tireSizeFront: '',
    tireSizeRear: '',
    vin: '',
    createdByUserId: 0,
    
    vehicleDepreciation: newVehicleDepreciation(),
    vehicleOwnership: newVehicleOwnership(),
    vehiclePurchase: newVehiclePurchase(),
    vehicleSecondaryDetail: newVehicleSecondaryDetail()
})

export const newVehicleArmourDetail = (tempIds?: number[]): VehicleArmourDetail => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    armourCompanyName: '',
    armouredArea: '',
    description: '',
    remarks: '',
    vehicleId: 0
})

export const newVehicleDepreciation = (): VehicleDepreciation => ({
    id: 0,
    depreciationMethodId: Number(DepreciationMethodEnum.StraightLine),
    depreciationPeriodTypeId: Number(DepreciationPeriodTypeEnum.Monthly),
    vehicleId: 0,
    residualValue: 0,
    usefulLife: 0
})

export const newVehicleDepreciationDetail = (tempIds?: number[]): VehicleDepreciationDetail => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    depreciationAmount: 0,
    depreciationPeriod: new Date(),
    depreciationRate: 0,
    purchaseCost: 0,
    residualCost: 0,
    usefulLife: 0,
    vehicleDepreciationId: 0,
})

export const newVehicleDocumentAttachment = (tempIds?: number[]): VehicleDocumentAttachment => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    action: '',
    dateUploaded: new Date(),
    file: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    remarks: '',
    vehicleId: 0,
})

export const newVehicleEngineHistory = (tempIds?: number[]): VehicleEngineHistory => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    createdBy: '',
    dateCreated: undefined,
    from: 0,
    remarks: '',
    to: 0,
    vehicleId: 0,
})

export const newVehicleFuelMonitoring = (tempIds?: number[]): VehicleFuelMonitoring => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    averageConsumption: 0,
    fuelCost: 0,
    lastRefuelDate: undefined,
    odometerReadingCurrent: 0,
    odometerReadingPrevious: 0,
    totalDistanceTravelled: 0,
    totalFuelCost: 0,
    totalLitersLoaded: 0,
    totalLitersLoadedPrevious: 0,
    vehicleId: 0,
})

export const newVehicleImageAttachment = (tempIds?: number[]): VehicleImageAttachment => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    dateUploaded: new Date(),
    fileName: '',
    fileSize: 0,
    image: '',
    imageType: '',
    isDefault: false,
    isPrintable: false,
    orientation: '',
    remarks: '',
    vehicleId: 0,
})

export const newVehicleLinkedAsset = (tempIds?: number[]): VehicleLinkedAsset => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    assetCategoryId: Number(AssetCategoryEnum.GeneralAsset),
    assetRefId: '',
    dateLinked: new Date(),
    hireStatus: '',
    linkedGeneralAssetId: 0,
    linkedVehicleId: 0,
    location: '',
    maintenanceStatus: '',
    processedBy: '',
    vehicleId: 0,
    vinSerialNo: '',
})

export const newVehicleLinkedGeneralAsset = (): VehicleLinkedGeneralAsset => ({
    tempId: 0,
    id: 0,
    dateLinked: new Date(),
    linkedGeneralAssetId: 0,
    vehicleId: 0,
})

export const newVehicleLinkedVehicle = (): VehicleLinkedVehicle => ({
    tempId: 0,
    id: 0,
    dateLinked: new Date(),
    linkedVehicleId: 0,
    vehicleId: 0,
})

export const newVehicleOdometerHistory = (tempIds?: number[]): VehicleOdometerHistory => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    dateCreated: new Date(),
    from: 0,
    remarks: '',
    to: 0,
    vehicleId: 0,
})

export const newVehicleOwnership = (): VehicleOwnership => ({
    tempId: 0,
    id: 0,
    customerCode: '',
    purchasedBy: '',
    vehicleId: 0,
})

export const newVehiclePurchase = (): VehiclePurchase => ({
    tempId: 0,
    id: 0,
    acquisitionAmount: 500,
    acquisitionDate: new Date(),
    assetStateId: 0,
    otherCharges: 0,
    paymentTypeId: 0,
    referencePONo: '',
    shippingCharges: 0,
    supplier: '',
    taxCharges: 0,
    totalAcquisitionAmount: 0,
    vehicleId: 0,
})
export const newVehicleRegistrationDetail = (tempIds?: number[]): VehicleRegistrationDetail => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    expiryDate: undefined,
    licenseNo: '',
    placeOfRegistration: '',
    referenceNo: '',
    registeredTo: '',
    registrationDate: undefined,
    vehicleId: 0,
})
export const newVehicleSecondaryDetail = (): VehicleSecondaryDetail => ({
    tempId: 0,
    id: 0,
    assignedToName: '',
    contactNo: '',
    emailAddress: '',
    engineCode: '',
    engineNo: '',
    engineSize: '',
    engineTypeId: 0,
    fuelCapacity: 0,
    fuelTypeId: 0,
    lastOdometerReading: 0,
    meterTypeId: 0,
    meterType: '',
    transmissionCode: '',
    transmissionTypeId: 0,
    vehicleId: 0,
})
export const newVehicleWarrantyDetail = (tempIds?: number[]): VehicleWarrantyDetail => ({
    tempId: generateNegativeNumber({ flat: tempIds }),
    id: 0,
    expiryDate: undefined,
    referenceNo: '',
    registeredTo: '',
    startDate: undefined,
    vehicleId: 0,
    warrantyProvider: '',
    warrantyTypeId: 0,
    warrantyType: '',
})


/**
 * Modifying any property on the shapes, need to adjust as well in API.
 * Please take note as well when the combo box is not mandatory and the value of an property id (e.g. assetColorId) is 0,
 * it will create an error regarding on the foreign key and the transaction will not proceed for saving.
 * 
 * Need to set to undefined the value and the property type if it is not a mandatory field especially for those foreign key column
 * **/
export const vehicleShape = {
    assetColorId: yup.number().min(1, 'Color is required'),
    assetLocationId: yup.number().min(1, 'Location Name is required'),
    assetManufacturerId: yup.number().min(1, 'Manufacturer is required'),
    assetName: yup.string().required('Asset Name is required'),
    assetOwnershipTypeId: yup.number().min(1, 'Ownership Type is required'),
    assetModelId: yup.number().min(1, 'Model is required'),
    assetModelYear: yup.date().required('Model Year is required'),
    assetStatusId: yup.number().min(1, 'Status is required'),
    assetTypeId: yup.number().min(1, 'Asset Type is required'),
    vehiclePurchase : yup.object().shape({
        assetStateId: yup.number().min(1, 'Asset State is required').required(),
        paymentTypeId: yup.number().min(1, 'Payment Type is required').required(),
    }),
    vehicleSecondaryDetail : yup.object().shape({
        engineNo: yup.string().required('Engine No. is required'),
        engineTypeId: yup.number().min(1, 'Engine Type is required').required(),
        fuelTypeId: yup.number().min(1, 'Fuel Type is required').required(),
        meterTypeId: yup.number().min(1, 'Meter Type is required').required(),
        transmissionTypeId: yup.number().min(1, 'Transmission Type is required').required(),
    }),
}