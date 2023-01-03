export default interface EstimateVehicleImageAttachment {
    tempId: number;
    id: number;
    estimateVehicleId: number;

    createdById: number;
    dateUploaded: Date;
    fileName: string;
    fileSize: number;
    image: string;
    imageType: string;
    isDefault: boolean;
    isPrintable: boolean;
    remarks: string;
};

