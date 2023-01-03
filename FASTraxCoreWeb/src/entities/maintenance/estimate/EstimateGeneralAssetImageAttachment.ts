export default interface EstimateGeneralAssetImageAttachment {
    tempId: number;
    id: number;
    estimateGeneralAssetId: number;

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

