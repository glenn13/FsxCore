interface GeneralAssetDepreciationDetail {
    tempId: number;
    id: number;
    generalAssetDepreciationId: number;

    depreciationPeriod?: Date;
    depreciationAmount: number;
    depreciationRate: number;
    purchaseCost: number;
    residualCost: number;
    usefulLife: number;
}