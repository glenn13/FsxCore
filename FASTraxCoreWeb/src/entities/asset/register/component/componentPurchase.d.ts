interface ComponentPurchase {
    id: number;
    acquisitionAmount: number;
    acquisitionDate?: Date;
    assetStateId: number;
    componentId: number;
    otherCharges: number;
    paymentTypeId: number;
    referencePONo: string;
    shippingCharges: number;
    supplier: string;
    taxCharges: number;
    totalAcquisitionAmount: number;
}