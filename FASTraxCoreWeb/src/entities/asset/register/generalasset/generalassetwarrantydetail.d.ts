interface GeneralAssetWarrantyDetail {
    tempId: number;
    id: number;
    expiryDate?: Date;
    generalAssetId: number;
    referenceNo: string;
    registeredTo: string;
    startDate?: Date;
    warrantyProvider: string;
    warrantyTypeId: number;
    warrantyType: string;
}