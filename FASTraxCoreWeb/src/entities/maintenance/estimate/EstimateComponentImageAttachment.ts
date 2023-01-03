export default interface EstimateComponentImageAttachment {
    tempId: number;
    id: number;
    estimateComponentId: number;

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

