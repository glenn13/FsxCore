import {createAction } from '@reduxjs/toolkit';
import WorkOrderVehicleTotal from '@app/entities/maintenance/workorder/WorkOrderVehicleTotal';

export const setWorkOrderVehicleTotal = createAction<WorkOrderVehicleTotal>('SET_WORK_ORDER_VEHICLE_TOTAL');

export const initWorkOrderVehicleTotal = (): WorkOrderVehicleTotal => ({
    id: 0,
    workOrderVehicleId: 0,
    estimateLabour: 0,
    estimateMaterial: 0,
    estimateOther: 0,
    estimateGross: 0,
    estimateDiscount: 0,
    estimateNet: 0,
    actualLabour: 0,
    actualMaterial: 0,
    actualOther: 0,
    actualGross: 0,
    actualDiscount: 0,
    actualNet: 0
});
