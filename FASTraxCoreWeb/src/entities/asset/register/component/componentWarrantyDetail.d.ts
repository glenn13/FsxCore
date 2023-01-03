interface ComponentWarrantyDetail {
    tempId: number;
    id: number;
    componentId: number;
    expiryDate?: Date;
    referenceNo: string;
    registeredTo: string;
    startDate?: Date;
    warrantyProvider: string;
    warrantyTypeId: number;
    warrantyType: string;
}