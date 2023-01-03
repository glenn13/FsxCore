
/**This entity will serve as the combination of general asset and vehicle link asset**/
interface VehicleLinkedAsset {
    tempId: number;
    id: number;
    assetCategoryId: number;
    assetRefId: string;
    dateLinked: Date;
    hireStatus: string;
    linkedGeneralAssetId: number;
    linkedVehicleId: number;
    location: string;
    maintenanceStatus: string;
    processedBy: string;
    vehicleId: number;
    vinSerialNo: string;
}

