import { createReducer, createAction } from '@reduxjs/toolkit';
import EstimateVehicleDate from '@app/entities/maintenance/estimate/EstimateVehicleDate';

export const setEstimateVehicleDate = createAction<EstimateVehicleDate>('SET_ESTIMATE_VEHICLE_DATE');

export const initEstimateVehicleDate = (): EstimateVehicleDate => ({
    id: 0,
    estimateVehicleId: 0,

    dateApprovedDeclined: new Date(),
    dateClosed: new Date(),
    dateCreated: new Date(),
    dateSubmittedForApproval: new Date()
});

export const estimateVehicleDateReducer = createReducer(initEstimateVehicleDate(), builder =>
    builder.addCase(setEstimateVehicleDate, (_, action) => ({ ...action.payload }))
);
