import { createAction } from '@reduxjs/toolkit';
import WorkOrderBOMTotal from '@app/entities/maintenance/workorder/WorkOrderBOMTotal';

export const setWorkOrderBOMTotal = createAction<WorkOrderBOMTotal>('SET_WORK_ORDER_BOM_TOTAL');

export const initWorkOrderBOMTotal = (): WorkOrderBOMTotal => ({
    id: 0,
    workOrderBOMId: 1,
    estimateLabour: 2,
    estimateMaterial: 3,
    estimateOther: 4,
    estimateGross: 5,
    estimateDiscount: 6,
    estimateNet: 7,
    actualLabour: 8,
    actualMaterial: 9,
    actualOther: 10,
    actualGross: 11,
    actualDiscount: 12,
    actualNet: 13
});
