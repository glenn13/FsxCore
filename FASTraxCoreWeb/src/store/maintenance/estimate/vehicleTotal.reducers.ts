import { createAction } from '@reduxjs/toolkit';
import EstimateVehicleTotal from '@app/entities/maintenance/estimate/EstimateVehicleTotal';

export const setEstimateVehicleTotal = createAction<EstimateVehicleTotal>('SET_ESTIMATE_VEHICLE_TOTAL');

export const initEstimateVehicleTotal = (): EstimateVehicleTotal => ({
    id: 0,
    estimateVehicleId: 1,
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
