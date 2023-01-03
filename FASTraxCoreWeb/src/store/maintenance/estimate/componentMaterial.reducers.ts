import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import EstimateComponentMaterial from '@app/entities/maintenance/estimate/EstimateComponentMaterial';

export const addEstimateComponentMaterial = createAction<EstimateComponentMaterial>('ADD_ESTIMATE_COMPONENT_MATERIAL');
export const setEstimateComponentMaterials = createAction<EstimateComponentMaterial[]>('SET_ESTIMATE_COMPONENT_MATERIAL');
export const updateEstimateComponentMaterial = createAction<EstimateComponentMaterial>('UPDATE_ESTIMATE_COMPONENT_MATERIAL');
export const removeEstimateComponentMaterial = createAction<EstimateComponentMaterial>('REMOVE_ESTIMATE_COMPONENT_MATERIAL');

export const initEstimateComponentMaterial: EstimateComponentMaterial[] = [];

export const initSingEstimateComponentMaterial = (ids?: number[]): EstimateComponentMaterial => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    estimateComponentId: 0,
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

export const emptyEstimateComponentMaterial = (ids?: number[]): EstimateComponentMaterial => {
    return initSingEstimateComponentMaterial(ids);
};

export const estimateComponentMaterialReducer = createReducer(initEstimateComponentMaterial, builder =>
    builder
        .addCase(addEstimateComponentMaterial, (state, action) => ([...state, action.payload]))
        .addCase(setEstimateComponentMaterials, (_, action) => action.payload)
        .addCase(updateEstimateComponentMaterial, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeEstimateComponentMaterial, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);