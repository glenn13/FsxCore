import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import EstimateVehicleAdditionalCharge from '@app/entities/maintenance/estimate/EstimateVehicleAdditionalCharge';

export const addEstimateVehicleAdditionalCharge = createAction<EstimateVehicleAdditionalCharge>('ADD_ESTIMATE_VEHICLE_ADDITIONAL_CHARGE');
export const removeEstimateVehicleAdditionalCharge = createAction<EstimateVehicleAdditionalCharge>('REMOVE_ESTIMATE_VEHICLE_ADDITIONAL_CHARGE');
export const setEstimateVehicleAdditionalCharges = createAction<EstimateVehicleAdditionalCharge[]>('SET_ESTIMATE_VEHICLE_ADDITIONAL_CHARGE');
export const updateEstimateVehicleAdditionalCharge = createAction<EstimateVehicleAdditionalCharge>('UPDATE_ESTIMATE_VEHICLE_ADDITIONAL_CHARGE');

export const initEstimateVehicleAdditionalCharge: EstimateVehicleAdditionalCharge[] = [];

export const initSingEstimateVehicleAdditionalCharge = (ids?: number[]): EstimateVehicleAdditionalCharge => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    estimateVehicleId: 0,
    approvalStatusId: 1,
    description: 'Test Description',
    quantity: 4,
    remarks: 'Test Remarks',
    salesPrice: 5,
    totalSalesPrice: 20,
    assetUOMId: 1
});

export const emptyEstimateVehicleAdditionalCharge = (ids?: number[]): EstimateVehicleAdditionalCharge => {
    return initSingEstimateVehicleAdditionalCharge(ids);
};

export const estimateVehicleAdditionalChargeReducer = createReducer(initEstimateVehicleAdditionalCharge, builder =>
    builder
        .addCase(addEstimateVehicleAdditionalCharge, (state, action) => ([...state, action.payload]))
        .addCase(setEstimateVehicleAdditionalCharges, (_, action) => action.payload)
        .addCase(updateEstimateVehicleAdditionalCharge, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeEstimateVehicleAdditionalCharge, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);