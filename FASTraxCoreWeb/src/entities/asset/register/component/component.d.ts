interface Component {
    id: number;
    projectSiteId: number;
    assetCategoryId: number;
    assetColorId: number;
    assetDepartmentId: number;
    assetManufacturerId: number;
    assetModelId: number;
    assetModelYear?: Date; //Intended to undefined property to display empty values in the UI eventhough this is a mandatory field.
    assetName: string;
    assetOwnershipTypeId: number;
    assetRefId: string;
    assetStatusId: number;
    assetTypeId: number;
    assignedToId: number;
    dateRegistered?: Date;
    description: string;
    inventoryDate?: Date;
    lastServiceDate?: Date;
    nextServiceDate?: Date;
    maintenanceStatusId?: number;
    serialNo: string;
    series: string;
    createdByUserId: number;
    modifiedByUserId?: number;

    componentOwnership?: ComponentOwnership;
    componentPurchase?: ComponentPurchase;
    componentDepreciation?: ComponentDepreciation;

    componentTransactionHistory?: RegisterTransactionHistory;
}