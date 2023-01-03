export default interface EstimateGeneralAssetDocumentAttachment {
    tempId: number;
    id: number;
    estimateGeneralAssetId: number;

    action: string;
    createdById: number;
    dateUploaded: Date;
    file: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    remarks: string;
};

