import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderBOMMaterial from '@app/entities/maintenance/workorder/WorkOrderBOMMaterial';

export const addWorkOrderBOMMaterial = createAction<WorkOrderBOMMaterial>('ADD_WORK_ORDER_BOM_MATERIAL');
export const setWorkOrderBOMMaterials = createAction<WorkOrderBOMMaterial[]>('SET_WORK_ORDER_BOM_MATERIAL');
export const updateWorkOrderBOMMaterial = createAction<WorkOrderBOMMaterial>('UPDATE_WORK_ORDER_BOM_MATERIAL');
export const removeWorkOrderBOMMaterial = createAction<WorkOrderBOMMaterial>('REMOVE_WORK_ORDER_BOM_MATERIAL');

export const initWorkOrderBOMMaterial: WorkOrderBOMMaterial[] = [];

export const initSingWorkOrderBOMMaterial = (ids?: number[]): WorkOrderBOMMaterial => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    workOrderBOMId: 0,
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

export const emptyWorkOrderBOMMaterial = (ids?: number[]): WorkOrderBOMMaterial => {
    return initSingWorkOrderBOMMaterial(ids);
};

export const workOrderBOMMaterialReducer = createReducer(initWorkOrderBOMMaterial, builder =>
    builder
        .addCase(addWorkOrderBOMMaterial, (state, action) => ([...state, action.payload]))
        .addCase(setWorkOrderBOMMaterials, (_, action) => action.payload)
        .addCase(updateWorkOrderBOMMaterial, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderBOMMaterial, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);