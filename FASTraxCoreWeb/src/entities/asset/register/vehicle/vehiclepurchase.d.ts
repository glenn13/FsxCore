interface VehiclePurchase {
    tempId: number;
    id: number;
    acquisitionAmount: number;
    acquisitionDate: Date;
    assetStateId: number;
    otherCharges: number;
    paymentTypeId: number;
    referencePONo: string;
    shippingCharges: number;
    supplier: string;
    taxCharges: number;
    totalAcquisitionAmount: number;
    vehicleId: number;
}
