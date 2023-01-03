interface GeneralAsset {
    id: number;
    assetColorId: number;
    assetCategoryId: number;
    assetDepartmentId: number;
    assetGroupId: number;
    assetItemNameId: number;
    assetManufacturerId: number;
    assetModelId: number;
    assetModelYear?: Date; //Intended to undefined property to display empty values in the UI eventhough this is a mandatory field.
    assetOwnershipTypeId: number;
    assetRefId: string;    
    assetStatusId: number;
    assetTypeId: number;
    assetUOMId: number;
    assignedToId: number;
    dateRegistered?: Date;
    description: string;
    lastServiceDate?: Date;
    nextServiceDate?: Date;
    maintenanceStatusId?: number;
    inventoryDate?: Date;
    projectSiteId: number;
    serialNo: string;
    series: string;
    createdByUserId: number;
    modifiedByUserId?: number;
  
    generalAssetOwnership?: GeneralAssetOwnership;
    generalAssetPurchase?: GeneralAssetPurchase;
    generalAssetDepreciation?: GeneralAssetDepreciation;

    generalAssetTransactionHistory?: RegisterTransactionHistory;
}