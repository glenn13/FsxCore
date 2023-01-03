import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import EstimateVehicleMaterial from '@app/entities/maintenance/estimate/EstimateVehicleMaterial';

export const addEstimateVehicleMaterial = createAction<EstimateVehicleMaterial>('ADD_ESTIMATE_VEHICLE_MATERIAL');
export const setEstimateVehicleMaterials = createAction<EstimateVehicleMaterial[]>('SET_ESTIMATE_VEHICLE_MATERIAL');
export const updateEstimateVehicleMaterial = createAction<EstimateVehicleMaterial>('UPDATE_ESTIMATE_VEHICLE_MATERIAL');
export const removeEstimateVehicleMaterial = createAction<EstimateVehicleMaterial>('REMOVE_ESTIMATE_VEHICLE_MATERIAL');

export const initEstimateVehicleMaterial: EstimateVehicleMaterial[] = [];

export const initSingEstimateVehicleMaterial = (ids?: number[]): EstimateVehicleMaterial => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    estimateVehicleId: 0,
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

export const emptyEstimateVehicleMaterial = (ids?: number[]): EstimateVehicleMaterial => {
    return initSingEstimateVehicleMaterial(ids);
};

export const estimateVehicleMaterialReducer = createReducer(initEstimateVehicleMaterial, builder =>
    builder
        .addCase(addEstimateVehicleMaterial, (state, action) => ([...state, action.payload]))
        .addCase(setEstimateVehicleMaterials, (_, action) => action.payload)
        .addCase(updateEstimateVehicleMaterial, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeEstimateVehicleMaterial, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);