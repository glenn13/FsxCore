import {createReducer, createAction} from '@reduxjs/toolkit';
import {generateUUID} from '@app/helpers/randoms';
import {newAsset} from '@app/entities/asset/inventory/Asset';
import {Component} from '@app/entities/asset/inventory/Component';
import WorkOrderComponent from '@app/entities/maintenance/workorder/WorkOrderComponent';
import WorkOrderComponentAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderComponentAdditionalCharge';
import WorkOrderComponentCustomerDetails from '@app/entities/maintenance/workorder/WorkOrderComponentCustomerDetails';
import WorkOrderComponentDate from '@app/entities/maintenance/workorder/WorkOrderComponentDate';
import WorkOrderComponentDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderComponentDocumentAttachment';
import WorkOrderComponentImageAttachment from '@app/entities/maintenance/workorder/WorkOrderComponentImageAttachment';
import WorkOrderComponentLabour from '@app/entities/maintenance/workorder/WorkOrderComponentLabour';
import WorkOrderComponentMaterial from '@app/entities/maintenance/workorder/WorkOrderComponentMaterial';
import WorkOrderComponentMobileService from '@app/entities/maintenance/workorder/WorkOrderComponentMobileService';
import WorkOrderComponentTotal from '@app/entities/maintenance/workorder/WorkOrderComponentTotal';

import {
  initWorkOrderComponentAdditionalCharge,
  setWorkOrderComponentAdditionalCharges,
} from './componentAdditionalCharge.reducers';
import {
  initWorkOrderComponentCustomerDetail,
  setWorkOrderComponentCustomerDetail,
} from './componentCustomerDetail.reducers';
import {initWorkOrderComponentDate, setWorkOrderComponentDate} from './componentDate.reducers';
import {
  initWorkOrderComponentDocumentAttachment,
  setWorkOrderComponentDocumentAttachments,
} from './componentDocumentAttachment.reducers';
import {
  initWorkOrderComponentImageAttachment,
  setWorkOrderComponentImageAttachments,
} from './componentImageAttachment.reducers';
import {
  initWorkOrderComponentLabour,
  setWorkOrderComponentLabours,
} from './componentLabour.reducers';
import {
  initWorkOrderComponentMaterial,
  setWorkOrderComponentMaterials,
} from './componentMaterial.reducers';
import {
  initWorkOrderComponentMobileService,
  setWorkOrderComponentMobileService,
} from './componentMobileService.reducers';
import {initWorkOrderComponentTotal, setWorkOrderComponentTotal} from './componentTotal.reducers';

export interface WorkOrderComponentStore {
  workOrderComponent: WorkOrderComponent;
  workOrderComponentAdditionalCharge: WorkOrderComponentAdditionalCharge[];
  workOrderComponentCustomerDetails: WorkOrderComponentCustomerDetails;
  workOrderComponentDate: WorkOrderComponentDate;
  workOrderComponentDocumentAttachments: WorkOrderComponentDocumentAttachment[];
  workOrderComponentImageAttachments: WorkOrderComponentImageAttachment[];
  workOrderComponentLabours: WorkOrderComponentLabour[];
  workOrderComponentMaterials: WorkOrderComponentMaterial[];
  workOrderComponentMobileService: WorkOrderComponentMobileService;
  workOrderComponentTotal: WorkOrderComponentTotal;
  component: Component;
}

export const addWorkOrderComponent = createAction<WorkOrderComponent>('ADD_WORK_ORDER_COMPONENT');
export const updateWorkOrderComponent = createAction<WorkOrderComponent>(
  'UPDATE_WORK_ORDER_COMPONENT',
);
export const setWorkOrderComponent = createAction<WorkOrderComponent>('SET_WORK_ORDER_COMPONENT');

export const setComponent = createAction<Component>('SET_COMPONENT');

export const initWorkOrderComponent = (): WorkOrderComponent => ({
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
  componentId: 0,

  //Technical Narative
  customerConcerns: '',
  findingsAndInstructions: '',
  safetyNotes: '',

  workOrderComponentCustomerDetails: initWorkOrderComponentCustomerDetail(),
  workOrderComponentDate: initWorkOrderComponentDate(),
  workOrderComponentMobileService: initWorkOrderComponentMobileService(),
  workOrderComponentTotal: initWorkOrderComponentTotal(),
});

export const initComponent = (): Component => ({
    ...newAsset(),
    id: 0,
    assetDepartmentId: 0,
    assignedToId: 0,
    projectSiteId: 0,
    assetRefId: '',
    assetManufacturerId: 0,
    assetStatusId: 0,
    assetGroupId: 0,
    assetTypeId: 0,
    assetModelId: 0,
    maintenanceStatusId: 0,
    seriesId: 0,
    assetOwnershipTypeId: 0,
    assetModelYearId: 0,
    assetColorId: 0,
    lastServiceDate: new Date(),
    inventoryDate: new Date(),
    dateRegistered: new Date(),
    serialNo: '',
    title: '',
    assetOwnershipId: 0,
});

export const initialWorkOrderComponentState: WorkOrderComponentStore = {
  workOrderComponent: initWorkOrderComponent(),
  workOrderComponentAdditionalCharge: initWorkOrderComponentAdditionalCharge,
  workOrderComponentCustomerDetails: initWorkOrderComponentCustomerDetail(),
  workOrderComponentDate: initWorkOrderComponentDate(),
  workOrderComponentDocumentAttachments: initWorkOrderComponentDocumentAttachment,
  workOrderComponentImageAttachments: initWorkOrderComponentImageAttachment,
  workOrderComponentLabours: initWorkOrderComponentLabour,
  workOrderComponentMaterials: initWorkOrderComponentMaterial,
  workOrderComponentMobileService: initWorkOrderComponentMobileService(),
  workOrderComponentTotal: initWorkOrderComponentTotal(),
  component: initComponent(),
};

export const workOrderComponentReducer = createReducer(initialWorkOrderComponentState, builder =>
  builder
    .addCase(setWorkOrderComponent, (state, action) => ({
      ...state,
      workOrderComponent: action.payload,
    }))
    .addCase(setWorkOrderComponentAdditionalCharges, (state, action) => ({
      ...state,
      workOrderComponentAdditionalCharge: action.payload,
    }))
    .addCase(setWorkOrderComponentCustomerDetail, (state, action) => ({
      ...state,
      workOrderComponentCustomerDetails: action.payload,
    }))
    .addCase(setWorkOrderComponentDate, (state, action) => ({
      ...state,
      workOrderComponentDate: action.payload,
    }))
    .addCase(setWorkOrderComponentDocumentAttachments, (state, action) => ({
      ...state,
      workOrderComponentDocumentAttachments: action.payload,
    }))
    .addCase(setWorkOrderComponentImageAttachments, (state, action) => ({
      ...state,
      workOrderComponentImageAttachments: action.payload,
    }))
    .addCase(setWorkOrderComponentLabours, (state, action) => ({
      ...state,
      workOrderComponentLabours: action.payload,
    }))
    .addCase(setWorkOrderComponentMaterials, (state, action) => ({
      ...state,
      workOrderComponentMaterials: action.payload,
    }))
    .addCase(setWorkOrderComponentMobileService, (state, action) => ({
      ...state,
      workOrderComponentMobileService: action.payload,
    }))
    .addCase(setWorkOrderComponentTotal, (state, action) => ({
      ...state,
      workOrderComponentTotal: action.payload,
    }))
    .addCase(setComponent, (state, action) => ({...state, component: action.payload})),
);
