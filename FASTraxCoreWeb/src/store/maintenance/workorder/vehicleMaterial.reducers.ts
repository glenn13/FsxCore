import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderVehicleMaterial from '@app/entities/maintenance/workorder/WorkOrderVehicleMaterial';

export const addWorkOrderVehicleMaterial = createAction<WorkOrderVehicleMaterial>('ADD_WORK_ORDER_VEHICLE_MATERIAL');
export const setWorkOrderVehicleMaterials = createAction<WorkOrderVehicleMaterial[]>('SET_WORK_ORDER_VEHICLE_MATERIAL');
export const updateWorkOrderVehicleMaterial = createAction<WorkOrderVehicleMaterial>('UPDATE_WORK_ORDER_VEHICLE_MATERIAL');
export const removeWorkOrderVehicleMaterial = createAction<WorkOrderVehicleMaterial>('REMOVE_WORK_ORDER_VEHICLE_MATERIAL');

export const initWorkOrderVehicleMaterial: WorkOrderVehicleMaterial[] = [];

export const initSingWorkOrderVehicleMaterial = (ids?: number[]): WorkOrderVehicleMaterial => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    workOrderVehicleId: 0,
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

export const emptyWorkOrderVehicleMaterial = (ids?: number[]): WorkOrderVehicleMaterial => {
    return initSingWorkOrderVehicleMaterial(ids);
};

export const workOrderVehicleMaterialReducer = createReducer(initWorkOrderVehicleMaterial, builder =>
    builder
        .addCase(addWorkOrderVehicleMaterial, (state, action) => ([...state, action.payload]))
        .addCase(setWorkOrderVehicleMaterials, (_, action) => action.payload)
        .addCase(updateWorkOrderVehicleMaterial, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderVehicleMaterial, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);