import { createAction } from '@reduxjs/toolkit';
import WorkOrderComponentTotal from '@app/entities/maintenance/workorder/WorkOrderComponentTotal';

export const setWorkOrderComponentTotal = createAction<WorkOrderComponentTotal>('SET_WORK_ORDER_COMPONENT_TOTAL');

export const initWorkOrderComponentTotal = (): WorkOrderComponentTotal => ({
    id: 0,
    workOrderComponentId: 0,
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
