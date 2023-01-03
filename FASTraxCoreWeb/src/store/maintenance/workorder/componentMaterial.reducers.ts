import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderComponentMaterial from '@app/entities/maintenance/workorder/WorkOrderComponentMaterial';

export const addWorkOrderComponentMaterial = createAction<WorkOrderComponentMaterial>('ADD_WORK_ORDER_COMPONENT_MATERIAL');
export const setWorkOrderComponentMaterials = createAction<WorkOrderComponentMaterial[]>('SET_WORK_ORDER_COMPONENT_MATERIAL');
export const updateWorkOrderComponentMaterial = createAction<WorkOrderComponentMaterial>('UPDATE_WORK_ORDER_COMPONENT_MATERIAL');
export const removeWorkOrderComponentMaterial = createAction<WorkOrderComponentMaterial>('REMOVE_WORK_ORDER_COMPONENT_MATERIAL');

export const initWorkOrderComponentMaterial: WorkOrderComponentMaterial[] = [];

export const initSingWorkOrderComponentMaterial = (ids?: number[]): WorkOrderComponentMaterial => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    workOrderComponentId: 0,
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

export const emptyWorkOrderComponentMaterial = (ids?: number[]): WorkOrderComponentMaterial => {
    return initSingWorkOrderComponentMaterial(ids);
};

export const workOrderComponentMaterialReducer = createReducer(initWorkOrderComponentMaterial, builder =>
    builder
        .addCase(addWorkOrderComponentMaterial, (state, action) => ([...state, action.payload]))
        .addCase(setWorkOrderComponentMaterials, (_, action) => action.payload)
        .addCase(updateWorkOrderComponentMaterial, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderComponentMaterial, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);