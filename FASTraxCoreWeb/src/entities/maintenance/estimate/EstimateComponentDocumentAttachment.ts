export default interface EstimateComponentDocumentAttachment {
    tempId: number;
    id: number;
    estimateComponentId: number;

    action: string;
    createdById: number;
    dateUploaded: Date;
    file: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    remarks: string;
};

