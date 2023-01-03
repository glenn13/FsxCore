import { createAction } from '@reduxjs/toolkit';
import WorkOrderGeneralAssetTotal from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetTotal';

export const setWorkOrderGeneralAssetTotal = createAction<WorkOrderGeneralAssetTotal>('SET_WORK_ORDER_GENERAL_ASSET_TOTAL');

export const initWorkOrderGeneralAssetTotal = (): WorkOrderGeneralAssetTotal => ({
    id: 0,
    workOrderGeneralAssetId: 0,
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
