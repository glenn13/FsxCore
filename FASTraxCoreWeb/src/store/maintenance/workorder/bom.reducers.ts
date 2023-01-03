import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateUUID } from '@app/helpers/randoms';
import WorkOrderBOM from '@app/entities/maintenance/workorder/WorkOrderBOM';
import WorkOrderBOMAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderBOMAdditionalCharge';
import WorkOrderBOMCustomerDetails from '@app/entities/maintenance/workorder/WorkOrderBOMCustomerDetails';
import WorkOrderBOMDate from '@app/entities/maintenance/workorder/WorkOrderBOMDate';
import WorkOrderBOMDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderBOMDocumentAttachment';
import WorkOrderBOMImageAttachment from '@app/entities/maintenance/workorder/WorkOrderBOMImageAttachment';
import WorkOrderBOMLabour from '@app/entities/maintenance/workorder/WorkOrderBOMLabour';
import WorkOrderBOMMaterial from '@app/entities/maintenance/workorder/WorkOrderBOMMaterial';
import WorkOrderBOMTotal from '@app/entities/maintenance/workorder/WorkOrderBOMTotal';

import { initWorkOrderBOMAdditionalCharge, setWorkOrderBOMAdditionalCharges } from './bomAdditionalCharge.reducers';
import { initWorkOrderBOMCustomerDetail, setWorkOrderBOMCustomerDetail } from './bomCustomerDetail.reducers';
import { initWorkOrderBOMDate, setWorkOrderBOMDate } from './bomDate.reducers';
import { initWorkOrderBOMDocumentAttachment, setWorkOrderBOMDocumentAttachments } from './bomDocumentAttachment.reducers';
import { initWorkOrderBOMImageAttachment, setWorkOrderBOMImageAttachments } from './bomImageAttachment.reducers';
import { initWorkOrderBOMLabour, setWorkOrderBOMLabours } from './bomLabour.reducers';
import { initWorkOrderBOMMaterial, setWorkOrderBOMMaterials } from './bomMaterial.reducers';
import { initWorkOrderBOMTotal, setWorkOrderBOMTotal } from './bomTotal.reducers';

export interface WorkOrderBOMStore {
    workOrderBOM: WorkOrderBOM;
    workOrderBOMAdditionalCharge: WorkOrderBOMAdditionalCharge[];
    workOrderBOMCustomerDetails: WorkOrderBOMCustomerDetails;
    workOrderBOMDate: WorkOrderBOMDate;
    workOrderBOMDocumentAttachments: WorkOrderBOMDocumentAttachment[];
    workOrderBOMImageAttachments: WorkOrderBOMImageAttachment[];
    workOrderBOMLabours: WorkOrderBOMLabour[];
    workOrderBOMMaterials: WorkOrderBOMMaterial[];
    workOrderBOMTotal: WorkOrderBOMTotal;
}

export const addWorkOrderBOM = createAction<WorkOrderBOM>('ADD_WORK_ORDER_BOM');
export const updateWorkOrderBOM = createAction<WorkOrderBOM>('UPDATE_WORK_ORDER_BOM');
export const setWorkOrderBOM = createAction<WorkOrderBOM>('SET_WORK_ORDER_BOM');

export const initWorkOrderBOM = (): WorkOrderBOM => ({
    id: 0,

    //Primary Details
    currencyId: 0,
    exchangeRate: 0,
    maintenanceDepartmentId: 0,
    maintenanceLocationId: 0,
    priorityLevelId: 0,
    referenceCustomerOrderNumber: '',
    referenceEstimationNumber: '',
    referenceSalesInvoiceNumber: '',
    workOrderNumber: generateUUID(true).toUpperCase(),
    workOrderStatusId: 0,
    workOrderTypeId: 0,

    //Technical Narative
    workDescription: '',

    workOrderBOMCustomerDetails: initWorkOrderBOMCustomerDetail(),
    workOrderBOMDate: initWorkOrderBOMDate(),
    workOrderBOMTotal: initWorkOrderBOMTotal()
});

export const initialWorkOrderBOMState: WorkOrderBOMStore = {
    workOrderBOM: initWorkOrderBOM(),
    workOrderBOMAdditionalCharge: initWorkOrderBOMAdditionalCharge,
    workOrderBOMCustomerDetails: initWorkOrderBOMCustomerDetail(),
    workOrderBOMDate: initWorkOrderBOMDate(),
    workOrderBOMDocumentAttachments: initWorkOrderBOMDocumentAttachment,
    workOrderBOMImageAttachments: initWorkOrderBOMImageAttachment,
    workOrderBOMLabours: initWorkOrderBOMLabour,
    workOrderBOMMaterials: initWorkOrderBOMMaterial,
    workOrderBOMTotal: initWorkOrderBOMTotal()
}

export const workOrderBOMReducer = createReducer(initialWorkOrderBOMState, builder =>
    builder
        .addCase(setWorkOrderBOM, (state, action) => ({ ...state, workOrderBOM: action.payload }))
        .addCase(setWorkOrderBOMAdditionalCharges, (state, action) => ({ ...state, workOrderBOMAdditionalCharge: action.payload }))
        .addCase(setWorkOrderBOMCustomerDetail, (state, action) => ({ ...state, workOrderBOMCustomerDetails: action.payload }))
        .addCase(setWorkOrderBOMDate, (state, action) => ({ ...state, workOrderBOMDate: action.payload }))
        .addCase(setWorkOrderBOMDocumentAttachments, (state, action) => ({ ...state, workOrderBOMDocumentAttachments: action.payload }))
        .addCase(setWorkOrderBOMImageAttachments, (state, action) => ({ ...state, workOrderBOMImageAttachments: action.payload }))
        .addCase(setWorkOrderBOMLabours, (state, action) => ({ ...state, workOrderBOMLabours: action.payload }))
        .addCase(setWorkOrderBOMMaterials, (state, action) => ({ ...state, workOrderBOMMaterials: action.payload }))
        .addCase(setWorkOrderBOMTotal, (state, action) => ({ ...state, workOrderBOMTotal: action.payload }))
);
