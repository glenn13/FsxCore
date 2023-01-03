import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import EstimateGeneralAssetMaterial from '@app/entities/maintenance/estimate/EstimateGeneralAssetMaterial';

export const addEstimateGeneralAssetMaterial = createAction<EstimateGeneralAssetMaterial>('ADD_ESTIMATE_GENERAL_ASSET_MATERIAL');
export const setEstimateGeneralAssetMaterials = createAction<EstimateGeneralAssetMaterial[]>('SET_ESTIMATE_GENERAL_ASSET_MATERIAL');
export const updateEstimateGeneralAssetMaterial = createAction<EstimateGeneralAssetMaterial>('UPDATE_ESTIMATE_GENERAL_ASSET_MATERIAL');
export const removeEstimateGeneralAssetMaterial = createAction<EstimateGeneralAssetMaterial>('REMOVE_ESTIMATE_GENERAL_ASSET_MATERIAL');

export const initEstimateGeneralAssetMaterial: EstimateGeneralAssetMaterial[] = [];

export const initSingEstimateGeneralAssetMaterial = (ids?: number[]): EstimateGeneralAssetMaterial => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    estimateGeneralAssetId: 0,
    costPrice: 35,
    dateIssued: new Date(),
    description: 'DESCRIPTION Test',
    etd: new Date(),
    isApproved: true,
    isChargeable: false,
    isIssued: true,
    isOldPartReturned: false,
    maintenanceDepartmentId: 1,
    maintenanceLocationId: 1,
    markUp: 23,
    partNo: 'PNO111222',
    priceGroup: 1,
    quantity: 25,
    referencePONumber: 'RFCPONOE111',
    referenceSSRNumber: 'RFSSRNO111',
    remarks: 'TEST REMARKS',
    reservedQuantity: 2,
    salesPrice: 3,
    total: 4,
    assetUOMId: 1
});

export const emptyEstimateGeneralAssetMaterial = (ids?: number[]): EstimateGeneralAssetMaterial => {
    return initSingEstimateGeneralAssetMaterial(ids);
};

export const estimateGeneralAssetMaterialReducer = createReducer(initEstimateGeneralAssetMaterial, builder =>
    builder
        .addCase(addEstimateGeneralAssetMaterial, (state, action) => ([...state, action.payload]))
        .addCase(setEstimateGeneralAssetMaterials, (_, action) => action.payload)
        .addCase(updateEstimateGeneralAssetMaterial, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeEstimateGeneralAssetMaterial, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);