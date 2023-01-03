import { createAction } from '@reduxjs/toolkit';
import EstimateGeneralAssetTotal from '@app/entities/maintenance/estimate/EstimateGeneralAssetTotal';

export const setEstimateGeneralAssetTotal = createAction<EstimateGeneralAssetTotal>('SET_ESTIMATE_GENERAL_ASSET_TOTAL');

export const initEstimateGeneralAssetTotal = (): EstimateGeneralAssetTotal => ({
    id: 0,
    estimateGeneralAssetId: 1,
    estimateDiscount: 6,
    estimateGross: 5,
    estimateLabour: 2,
    estimateMaterial: 3,
    estimateNet: 7,
    estimateOther: 4,
    approvedDiscount: 12,
    approvedGross: 11,
    approvedLabour: 8,
    approvedMaterial: 9,
    approvedNet: 13,
    approvedOther: 10
});
