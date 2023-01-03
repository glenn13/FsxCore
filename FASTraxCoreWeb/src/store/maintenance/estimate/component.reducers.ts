import {createReducer, createAction} from '@reduxjs/toolkit';
import {generateUUID} from '@app/helpers/randoms';
import {newAsset} from '@app/entities/asset/inventory/Asset';
import {Component} from '@app/entities/asset/inventory/Component';
import EstimateComponent from '@app/entities/maintenance/estimate/EstimateComponent';
import EstimateComponentAdditionalCharge from '@app/entities/maintenance/estimate/EstimateComponentAdditionalCharge';
import EstimateComponentCustomerDetails from '@app/entities/maintenance/estimate/EstimateComponentCustomerDetails';
import EstimateComponentDate from '@app/entities/maintenance/estimate/EstimateComponentDate';
import EstimateComponentDocumentAttachment from '@app/entities/maintenance/estimate/EstimateComponentDocumentAttachment';
import EstimateComponentImageAttachment from '@app/entities/maintenance/estimate/EstimateComponentImageAttachment';
import EstimateComponentMaterial from '@app/entities/maintenance/estimate/EstimateComponentMaterial';
import EstimateComponentTotal from '@app/entities/maintenance/estimate/EstimateComponentTotal';

import {
  initEstimateComponentAdditionalCharge,
  setEstimateComponentAdditionalCharges,
} from './componentAdditionalCharge.reducers';
import {
  initEstimateComponentCustomerDetail,
  setEstimateComponentCustomerDetail,
} from './componentCustomerDetail.reducers';
import {initEstimateComponentDate, setEstimateComponentDate} from './componentDate.reducers';
import {
  initEstimateComponentDocumentAttachment,
  setEstimateComponentDocumentAttachments,
} from './componentDocumentAttachment.reducers';
import {
  initEstimateComponentImageAttachment,
  setEstimateComponentImageAttachments,
} from './componentImageAttachment.reducers';
import {
  initEstimateComponentMaterial,
  setEstimateComponentMaterials,
} from './componentMaterial.reducers';
import {initEstimateComponentTotal, setEstimateComponentTotal} from './componentTotal.reducers';

export interface EstimateComponentStore {
  estimateComponent: EstimateComponent;
  estimateComponentAdditionalCharge: EstimateComponentAdditionalCharge[];
  estimateComponentCustomerDetails: EstimateComponentCustomerDetails;
  estimateComponentDate: EstimateComponentDate;
  estimateComponentDocumentAttachments: EstimateComponentDocumentAttachment[];
  estimateComponentImageAttachments: EstimateComponentImageAttachment[];
  estimateComponentMaterials: EstimateComponentMaterial[];
  estimateComponentTotal: EstimateComponentTotal;
  component: Component;
}

export const addEstimateComponent = createAction<EstimateComponent>('ADD_ESTIMATE_COMPONENT');
export const updateEstimateComponent = createAction<EstimateComponent>('UPDATE_ESTIMATE_COMPONENT');
export const setEstimateComponent = createAction<EstimateComponent>('SET_ESTIMATE_COMPONENT');

export const setComponent = createAction<Component>('SET_COMPONENT');

export const initEstimateComponent = (varComponentId: number): EstimateComponent => ({
  id: 0,

  //Primary Details
  costCenterId: 0,
  currencyId: 0,
  estimationNumber: generateUUID(true).toUpperCase(),
  estimationStatusId: 0,
  estimationTypeId: 0,
  maintenanceDepartmentId: 0,
  maintenanceLocationId: 0,
  priorityLevelId: 0,
  referenceCustomerOrderNumber: '',

  //Asset Information
    componentId: varComponentId,
  currentOdometerReading: 0,

  //Technical Narrative
  customerConcerns: '',
  findingsAndInstructions: '',
  safetyNotes: '',

  estimateComponentCustomerDetails: initEstimateComponentCustomerDetail(),
  estimateComponentDate: initEstimateComponentDate(),
  estimateComponentTotal: initEstimateComponentTotal(),
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

export const initialEstimateComponentState: EstimateComponentStore = {
  estimateComponent: initEstimateComponent(0),
  estimateComponentAdditionalCharge: initEstimateComponentAdditionalCharge,
  estimateComponentCustomerDetails: initEstimateComponentCustomerDetail(),
  estimateComponentDate: initEstimateComponentDate(),
  estimateComponentDocumentAttachments: initEstimateComponentDocumentAttachment,
  estimateComponentImageAttachments: initEstimateComponentImageAttachment,
  estimateComponentMaterials: initEstimateComponentMaterial,
  estimateComponentTotal: initEstimateComponentTotal(),
  component: initComponent(),
};

export const estimateComponentReducer = createReducer(initialEstimateComponentState, builder =>
  builder
    .addCase(setEstimateComponent, (state, action) => ({
      ...state,
      estimateComponent: action.payload,
    }))
    .addCase(setEstimateComponentAdditionalCharges, (state, action) => ({
      ...state,
      estimateComponentAdditionalCharge: action.payload,
    }))
    .addCase(setEstimateComponentCustomerDetail, (state, action) => ({
      ...state,
      estimateComponentCustomerDetails: action.payload,
    }))
    .addCase(setEstimateComponentDate, (state, action) => ({
      ...state,
      estimateComponentDate: action.payload,
    }))
    .addCase(setEstimateComponentDocumentAttachments, (state, action) => ({
      ...state,
      estimateComponentDocumentAttachments: action.payload,
    }))
    .addCase(setEstimateComponentImageAttachments, (state, action) => ({
      ...state,
      estimateComponentImageAttachments: action.payload,
    }))
    .addCase(setEstimateComponentMaterials, (state, action) => ({
      ...state,
      estimateComponentMaterials: action.payload,
    }))
    .addCase(setEstimateComponentTotal, (state, action) => ({
      ...state,
      estimateComponentTotal: action.payload,
    }))
    .addCase(setComponent, (state, action) => ({...state, component: action.payload})),
);
