interface VehicleSummary {
    flag: boolean;
    id: number;
    assetStatus: string;
    assetColor: string;
    maintenanceStatus: string;
    assetRefId: string;
    vin: string;
    assetType: string;
    assetManufacturer: string;
    assetModel: string,
    assetModelYear: string;
    meterType: string;
    lastOdometerReading: number;
    lastServiceDate?: Date;
    nextServiceDate?: Date;
    maintenanceCycle: string;
}