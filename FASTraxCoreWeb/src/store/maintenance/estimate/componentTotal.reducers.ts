import { createAction } from '@reduxjs/toolkit';
import EstimateComponentTotal from '@app/entities/maintenance/estimate/EstimateComponentTotal';

export const setEstimateComponentTotal = createAction<EstimateComponentTotal>('SET_ESTIMATE_COMPONENT_TOTAL');

export const initEstimateComponentTotal = (): EstimateComponentTotal => ({
    id: 0,
    estimateComponentId: 1,
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
