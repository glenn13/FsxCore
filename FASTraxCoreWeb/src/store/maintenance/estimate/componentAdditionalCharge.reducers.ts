import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import EstimateComponentAdditionalCharge from '@app/entities/maintenance/estimate/EstimateComponentAdditionalCharge';

export const addEstimateComponentAdditionalCharge = createAction<EstimateComponentAdditionalCharge>('ADD_ESTIMATE_COMPONENT_ADDITIONAL_CHARGE');
export const removeEstimateComponentAdditionalCharge = createAction<EstimateComponentAdditionalCharge>('REMOVE_ESTIMATE_COMPONENT_ADDITIONAL_CHARGE');
export const setEstimateComponentAdditionalCharges = createAction<EstimateComponentAdditionalCharge[]>('SET_ESTIMATE_COMPONENT_ADDITIONAL_CHARGE');
export const updateEstimateComponentAdditionalCharge = createAction<EstimateComponentAdditionalCharge>('UPDATE_ESTIMATE_COMPONENT_ADDITIONAL_CHARGE');

export const initEstimateComponentAdditionalCharge: EstimateComponentAdditionalCharge[] = [];

export const initSingEstimateComponentAdditionalCharge = (ids?: number[]): EstimateComponentAdditionalCharge => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    estimateComponentId: 0,
    approvalStatusId: 1,
    description: 'Test Description',
    quantity: 4,
    remarks: 'Test Remarks',
    salesPrice: 5,
    totalSalesPrice: 20,
    assetUOMId: 1
});

export const emptyEstimateComponentAdditionalCharge = (ids?: number[]): EstimateComponentAdditionalCharge => {
    return initSingEstimateComponentAdditionalCharge(ids);
};

export const estimateComponentAdditionalChargeReducer = createReducer(initEstimateComponentAdditionalCharge, builder =>
    builder
        .addCase(addEstimateComponentAdditionalCharge, (state, action) => ([...state, action.payload]))
        .addCase(setEstimateComponentAdditionalCharges, (_, action) => action.payload)
        .addCase(updateEstimateComponentAdditionalCharge, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeEstimateComponentAdditionalCharge, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);