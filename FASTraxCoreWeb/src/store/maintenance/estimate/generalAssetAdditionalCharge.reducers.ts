import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import EstimateGeneralAssetAdditionalCharge from '@app/entities/maintenance/estimate/EstimateGeneralAssetAdditionalCharge';

export const addEstimateGeneralAssetAdditionalCharge = createAction<EstimateGeneralAssetAdditionalCharge>('ADD_ESTIMATE_GENERAL_ASSET_ADDITIONAL_CHARGE');
export const removeEstimateGeneralAssetAdditionalCharge = createAction<EstimateGeneralAssetAdditionalCharge>('REMOVE_ESTIMATE_GENERAL_ASSET_ADDITIONAL_CHARGE');
export const setEstimateGeneralAssetAdditionalCharges = createAction<EstimateGeneralAssetAdditionalCharge[]>('SET_ESTIMATE_GENERAL_ASSET_ADDITIONAL_CHARGE');
export const updateEstimateGeneralAssetAdditionalCharge = createAction<EstimateGeneralAssetAdditionalCharge>('UPDATE_ESTIMATE_GENERAL_ASSET_ADDITIONAL_CHARGE');

export const initEstimateGeneralAssetAdditionalCharge: EstimateGeneralAssetAdditionalCharge[] = [];

export const initSingEstimateGeneralAssetAdditionalCharge = (ids?: number[]): EstimateGeneralAssetAdditionalCharge => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    estimateGeneralAssetId: 0,
    approvalStatusId: 1,
    description: 'Test Description',
    quantity: 4,
    remarks: 'Test Remarks',
    salesPrice: 5,
    totalSalesPrice: 20,
    assetUOMId: 1
});

export const emptyEstimateGeneralAssetAdditionalCharge = (ids?: number[]): EstimateGeneralAssetAdditionalCharge => {
    return initSingEstimateGeneralAssetAdditionalCharge(ids);
};

export const estimateGeneralAssetAdditionalChargeReducer = createReducer(initEstimateGeneralAssetAdditionalCharge, builder =>
    builder
        .addCase(addEstimateGeneralAssetAdditionalCharge, (state, action) => ([...state, action.payload]))
        .addCase(setEstimateGeneralAssetAdditionalCharges, (_, action) => action.payload)
        .addCase(updateEstimateGeneralAssetAdditionalCharge, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeEstimateGeneralAssetAdditionalCharge, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);