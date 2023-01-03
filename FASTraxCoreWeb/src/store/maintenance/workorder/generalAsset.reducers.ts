import {createReducer, createAction} from '@reduxjs/toolkit';
import {generateUUID} from '@app/helpers/randoms';
import {GeneralAsset} from '@app/entities/asset/inventory/GeneralAsset';
import {newGeneralAsset} from './../../../entities/asset/inventory/GeneralAsset';
import WorkOrderGeneralAsset from '@app/entities/maintenance/workorder/WorkOrderGeneralAsset';
import WorkOrderGeneralAssetDate from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetDate';
import WorkOrderGeneralAssetTotal from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetTotal';
import WorkOrderGeneralAssetLabour from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetLabour';
import WorkOrderGeneralAssetMaterial from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetMaterial';
import WorkOrderGeneralAssetAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetAdditionalCharge';
import WorkOrderGeneralAssetCustomerDetails from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetCustomerDetails';
import WorkOrderGeneralAssetDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetDocumentAttachment';
import WorkOrderGeneralAssetImageAttachment from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetImageAttachment';
import WorkOrderGeneralAssetMobileService from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetMobileService';

import {
  initWorkOrderGeneralAssetAdditionalCharge,
  setWorkOrderGeneralAssetAdditionalCharges,
} from './generalAssetAdditionalCharge.reducers';
import {
  initWorkOrderGeneralAssetCustomerDetail,
  setWorkOrderGeneralAssetCustomerDetail,
} from './generalAssetCustomerDetail.reducers';
import {
  initWorkOrderGeneralAssetDate,
  setWorkOrderGeneralAssetDate,
} from './generalAssetDate.reducers';
import {
  initWorkOrderGeneralAssetDocumentAttachment,
  setWorkOrderGeneralAssetDocumentAttachments,
} from './generalAssetDocumentAttachment.reducers';
import {
  initWorkOrderGeneralAssetImageAttachment,
  setWorkOrderGeneralAssetImageAttachments,
} from './generalAssetImageAttachment.reducers';
import {
  initWorkOrderGeneralAssetLabour,
  setWorkOrderGeneralAssetLabours,
} from './generalAssetLabour.reducers';
import {
  initWorkOrderGeneralAssetMaterial,
  setWorkOrderGeneralAssetMaterials,
} from './generalAssetMaterial.reducers';
import {
  initWorkOrderGeneralAssetMobileService,
  setWorkOrderGeneralAssetMobileService,
} from './generalAssetMobileService.reducers';
import {
  initWorkOrderGeneralAssetTotal,
  setWorkOrderGeneralAssetTotal,
} from './generalAssetTotal.reducers';

export interface WorkOrderGeneralAssetStore {
  workOrderGeneralAsset: WorkOrderGeneralAsset;
  workOrderGeneralAssetAdditionalCharge: WorkOrderGeneralAssetAdditionalCharge[];
  workOrderGeneralAssetCustomerDetails: WorkOrderGeneralAssetCustomerDetails;
  workOrderGeneralAssetDate: WorkOrderGeneralAssetDate;
  workOrderGeneralAssetDocumentAttachments: WorkOrderGeneralAssetDocumentAttachment[];
  workOrderGeneralAssetImageAttachments: WorkOrderGeneralAssetImageAttachment[];
  workOrderGeneralAssetLabours: WorkOrderGeneralAssetLabour[];
  workOrderGeneralAssetMaterials: WorkOrderGeneralAssetMaterial[];
  workOrderGeneralAssetMobileService: WorkOrderGeneralAssetMobileService;
  workOrderGeneralAssetTotal: WorkOrderGeneralAssetTotal;
  generalAsset: GeneralAsset;
}

export const addWorkOrderGeneralAsset = createAction<WorkOrderGeneralAsset>(
  'ADD_WORK_ORDER_GENERAL_ASSET',
);
export const updateWorkOrderGeneralAsset = createAction<WorkOrderGeneralAsset>(
  'UPDATE_WORK_ORDER_GENERAL_ASSET',
);
export const setWorkOrderGeneralAsset = createAction<WorkOrderGeneralAsset>(
  'SET_WORK_ORDER_GENERAL_ASSET',
);

export const setGeneralAsset = createAction<GeneralAsset>('SET_GENERAL_ASSET');

export const initWorkOrderGeneralAsset = (): WorkOrderGeneralAsset => ({
  id: 0,

  //Primary Details
  currencyId: 0,
  exchangeRate: 0,
  maintenanceDepartmentId: 0,
  maintenanceLocationId: 0,
  onSiteNumber: '',
  priorityLevelId: 0,
  referenceCustomerOrderNumber: '',
  referenceEstimationNumber: '',
  referenceSalesInvoiceNumber: '',
  repairStatusId: 0,
  reWorkReferenceNumber: '',
  workOrderNumber: generateUUID(true).toUpperCase(),
  workOrderStatusId: 0,
  workOrderTypeId: 0,

  //Asset Information
  currentOdometerReading: 0,
  fuelPercentOnReceive: 0,
  fuelPercentOnRelease: 0,
  generalAssetId: 0,

  //Technical Narative
  customerConcerns: '',
  findingsAndInstructions: '',
  safetyNotes: '',

  workOrderGeneralAssetCustomerDetails: initWorkOrderGeneralAssetCustomerDetail(),
  workOrderGeneralAssetDate: initWorkOrderGeneralAssetDate(),
  workOrderGeneralAssetMobileService: initWorkOrderGeneralAssetMobileService(),
  workOrderGeneralAssetTotal: initWorkOrderGeneralAssetTotal(),
});

export const initGeneralAsset = (): GeneralAsset => ({
  ...newGeneralAsset(),
});

export const initialWorkOrderGeneralAssetState: WorkOrderGeneralAssetStore = {
  workOrderGeneralAsset: initWorkOrderGeneralAsset(),
  workOrderGeneralAssetAdditionalCharge: initWorkOrderGeneralAssetAdditionalCharge,
  workOrderGeneralAssetCustomerDetails: initWorkOrderGeneralAssetCustomerDetail(),
  workOrderGeneralAssetDate: initWorkOrderGeneralAssetDate(),
  workOrderGeneralAssetDocumentAttachments: initWorkOrderGeneralAssetDocumentAttachment,
  workOrderGeneralAssetImageAttachments: initWorkOrderGeneralAssetImageAttachment,
  workOrderGeneralAssetLabours: initWorkOrderGeneralAssetLabour,
  workOrderGeneralAssetMaterials: initWorkOrderGeneralAssetMaterial,
  workOrderGeneralAssetMobileService: initWorkOrderGeneralAssetMobileService(),
  workOrderGeneralAssetTotal: initWorkOrderGeneralAssetTotal(),
  generalAsset: initGeneralAsset(),
};

export const workOrderGeneralAssetReducer = createReducer(
  initialWorkOrderGeneralAssetState,
  builder =>
    builder
      .addCase(setWorkOrderGeneralAsset, (state, action) => ({
        ...state,
        workOrderGeneralAsset: action.payload,
      }))
      .addCase(setWorkOrderGeneralAssetAdditionalCharges, (state, action) => ({
        ...state,
        workOrderGeneralAssetAdditionalCharge: action.payload,
      }))
      .addCase(setWorkOrderGeneralAssetCustomerDetail, (state, action) => ({
        ...state,
        workOrderGeneralAssetCustomerDetails: action.payload,
      }))
      .addCase(setWorkOrderGeneralAssetDate, (state, action) => ({
        ...state,
        workOrderGeneralAssetDate: action.payload,
      }))
      .addCase(setWorkOrderGeneralAssetDocumentAttachments, (state, action) => ({
        ...state,
        workOrderGeneralAssetDocumentAttachments: action.payload,
      }))
      .addCase(setWorkOrderGeneralAssetImageAttachments, (state, action) => ({
        ...state,
        workOrderGeneralAssetImageAttachments: action.payload,
      }))
      .addCase(setWorkOrderGeneralAssetLabours, (state, action) => ({
        ...state,
        workOrderGeneralAssetLabours: action.payload,
      }))
      .addCase(setWorkOrderGeneralAssetMaterials, (state, action) => ({
        ...state,
        workOrderGeneralAssetMaterials: action.payload,
      }))
      .addCase(setWorkOrderGeneralAssetMobileService, (state, action) => ({
        ...state,
        workOrderGeneralAssetMobileService: action.payload,
      }))
      .addCase(setWorkOrderGeneralAssetTotal, (state, action) => ({
        ...state,
        workOrderGeneralAssetTotal: action.payload,
      }))
      .addCase(setGeneralAsset, (state, action) => ({...state, generalAsset: action.payload})),
);
