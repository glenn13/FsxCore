export default interface EstimateVehicleDocumentAttachment {
    tempId: number;
    id: number;
    estimateVehicleId: number;

    action: string;
    createdById: number;
    dateUploaded: Date;
    file: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    remarks: string;
};

