interface ComponentSummary {
    flag: boolean;
    id: number;
    assetStatus: string;
    maintenanceStatus: string;
    assetRefId: string;
    serialNo: string;
    assetType: string;
    assetManufacturer: string;
    assetModel: string,
    assetModelYear: string;
    assetOwnershipType: string;
    assetColor: string;
    dateRegistered?: Date;
    lastServiceDate?: Date;
    nextServiceDate?: Date;
    maintenanceCycle: string;
}