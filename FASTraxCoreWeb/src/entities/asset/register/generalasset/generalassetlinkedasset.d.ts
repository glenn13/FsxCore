interface GeneralAssetLinkedAsset {
    id: number;
    generalAssetId: number;
    linkedGeneralAssetId: number;
    assetRefId: string;
    serialNo: string;
    maintenanceStatus: string;
    hireStatus: string;
    processedBy: string;
    dateLinked: Date;
}