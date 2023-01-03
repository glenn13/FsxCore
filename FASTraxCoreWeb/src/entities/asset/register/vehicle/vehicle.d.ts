interface Vehicle {
    assetCategoryId: number;
    assetColorId: number;
    assetColor: string;
    assetLocationId: number;
    assetManufacturerId: number;
    assetManufacturer: string;
    assetModelId: number;
    assetModel: string,
    assetModelYear?: Date; //Intended to undefined property to display empty values in the UI eventhough this is a mandatory field.
    assetName: string;
    assetOwnershipTypeId: number;
    assetRefId: string;
    assetStatusId: number;
    assetStatus: string;
    assetTypeId: number;
    assetType: string;
    dateRegistered?: Date;
    description: string;
    doorCount: number;
    fuelTankSizeId?: number;
    id: number;
    inventoryDate?: Date;
    lastServiceDate?: Date;
    nextServiceDate?: Date;
    maintenanceStatusId?: number;
    maintenanceStatus: string;
    maxCapacity: number;
    pickUpDate?: Date;
    projectSiteId: number;
    series: string;
    tireSizeFront: string;
    tireSizeRear: string;
    vin: string;
    createdByUserId: number;
    modifiedByUserId?: number;

    vehicleDepreciation?: VehicleDepreciation;
    vehicleOwnership?: VehicleOwnership;
    vehiclePurchase?: VehiclePurchase;
    vehicleSecondaryDetail?: VehicleSecondaryDetail;

    vehicleTransactionHistory?: RegisterTransactionHistory;
}
