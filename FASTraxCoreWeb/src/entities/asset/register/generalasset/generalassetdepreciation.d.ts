interface GeneralAssetDepreciation {
    id: number;
    generalAssetId: number;
    depreciationMethodId?: number;
    depreciationPeriodTypeId?: number;
    usefulLife: number;
    residualValue: number;
}