import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderGeneralAssetMaterial from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetMaterial';

export const addWorkOrderGeneralAssetMaterial = createAction<WorkOrderGeneralAssetMaterial>('ADD_WORK_ORDER_GENERAL_ASSET_MATERIAL');
export const setWorkOrderGeneralAssetMaterials = createAction<WorkOrderGeneralAssetMaterial[]>('SET_WORK_ORDER_GENERAL_ASSET_MATERIAL');
export const updateWorkOrderGeneralAssetMaterial = createAction<WorkOrderGeneralAssetMaterial>('UPDATE_WORK_ORDER_GENERAL_ASSET_MATERIAL');
export const removeWorkOrderGeneralAssetMaterial = createAction<WorkOrderGeneralAssetMaterial>('REMOVE_WORK_ORDER_GENERAL_ASSET_MATERIAL');

export const initWorkOrderGeneralAssetMaterial: WorkOrderGeneralAssetMaterial[] = [];

export const initSingWorkOrderGeneralAssetMaterial = (ids?: number[]): WorkOrderGeneralAssetMaterial => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    workOrderGeneralAssetId: 0,
    costPrice: 0,
    dateIssued: new Date(),
    description: '',
    etd: new Date(),
    isApproved: true,
    isChargeable: false,
    isIssued: true,
    isOldPartReturned: false,
    maintenanceDepartmentId: 0,
    maintenanceLocationId: 0,
    markUp: 0,
    partNo: '',
    priceGroup: 0,
    quantity: 0,
    referencePONumber: '',
    referenceSSRNumber: '',
    remarks: '',
    reservedQuantity: 0,
    salesPrice: 0,
    total: 0,
    assetUOMId: 0
});

export const emptyWorkOrderGeneralAssetMaterial = (ids?: number[]): WorkOrderGeneralAssetMaterial => {
    return initSingWorkOrderGeneralAssetMaterial(ids);
};

export const workOrderGeneralAssetMaterialReducer = createReducer(initWorkOrderGeneralAssetMaterial, builder =>
    builder
        .addCase(addWorkOrderGeneralAssetMaterial, (state, action) => ([...state, action.payload]))
        .addCase(setWorkOrderGeneralAssetMaterials, (_, action) => action.payload)
        .addCase(updateWorkOrderGeneralAssetMaterial, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderGeneralAssetMaterial, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);