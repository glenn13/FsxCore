interface ComponentDepreciationDetail {
    tempId: number;
    id: number;
    componentDepreciationId: number;
    depreciationAmount: number;
    depreciationPeriod?: Date;
    depreciationRate: number;
    purchaseCost: number;
    residualCost: number;
    usefulLife: number;
}