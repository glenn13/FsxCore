interface GeneralAssetRegistrationDetail {
    tempId: number;
    id: number;
    expiryDate?: Date;
    generalAssetId: number;
    placeOfRegistration: string;
    referenceNo: string;
    registeredTo: string;
    registrationDate?: Date;
}