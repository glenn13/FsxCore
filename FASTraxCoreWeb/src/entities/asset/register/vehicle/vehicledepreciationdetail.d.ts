interface VehicleDepreciationDetail {
    tempId: number;
    id: number;
    depreciationAmount: number;
    depreciationPeriod?: Date;
    depreciationRate: number;
    purchaseCost: number;
    residualCost: number;
    usefulLife: number;
    vehicleDepreciationId: number;
}
