interface GeneralAssetSecondaryDetail {
    tempId: number;
    id: number;
    flag: boolean;
    generalAssetId: number;
    assetStatus: string;
    maintenanceStatus: string;
    assetRefId: string;
    manufacturer: string;
    model: string;
    unitType: string;
    serialNo: string;
    description: string;
    poNo: string;
    purchaseDate?: Date;
    purchasePrice: number;
    lastServiceDate?: Date;
    nextServiceDate?: Date;
    maintenanceCycle: string;
}