import {createReducer, createAction} from '@reduxjs/toolkit';
import {generateUUID} from '@app/helpers/randoms';
import {GeneralAsset} from '@app/entities/asset/inventory/GeneralAsset';
import {newGeneralAsset} from './../../../entities/asset/inventory/GeneralAsset';
import EstimateGeneralAsset from '@app/entities/maintenance/estimate/EstimateGeneralAsset';
import EstimateGeneralAssetDate from '@app/entities/maintenance/estimate/EstimateGeneralAssetDate';
import EstimateGeneralAssetTotal from '@app/entities/maintenance/estimate/EstimateGeneralAssetTotal';
import EstimateGeneralAssetMaterial from '@app/entities/maintenance/estimate/EstimateGeneralAssetMaterial';
import EstimateGeneralAssetCustomerDetails from '@app/entities/maintenance/estimate/EstimateGeneralAssetCustomerDetails';
import EstimateGeneralAssetImageAttachment from '@app/entities/maintenance/estimate/EstimateGeneralAssetImageAttachment';
import EstimateGeneralAssetAdditionalCharge from '@app/entities/maintenance/estimate/EstimateGeneralAssetAdditionalCharge';
import EstimateGeneralAssetDocumentAttachment from '@app/entities/maintenance/estimate/EstimateGeneralAssetDocumentAttachment';

import {
  initEstimateGeneralAssetAdditionalCharge,
  setEstimateGeneralAssetAdditionalCharges,
} from './generalAssetAdditionalCharge.reducers';
import {
  initEstimateGeneralAssetCustomerDetail,
  setEstimateGeneralAssetCustomerDetail,
} from './generalAssetCustomerDetail.reducers';
import {
  initEstimateGeneralAssetDate,
  setEstimateGeneralAssetDate,
} from './generalAssetDate.reducers';
import {
  initEstimateGeneralAssetDocumentAttachment,
  setEstimateGeneralAssetDocumentAttachments,
} from './generalAssetDocumentAttachment.reducers';
import {
  initEstimateGeneralAssetImageAttachment,
  setEstimateGeneralAssetImageAttachments,
} from './generalAssetImageAttachment.reducers';
import {
  initEstimateGeneralAssetMaterial,
  setEstimateGeneralAssetMaterials,
} from './generalAssetMaterial.reducers';
import {
  initEstimateGeneralAssetTotal,
  setEstimateGeneralAssetTotal,
} from './generalAssetTotal.reducers';

export interface EstimateGeneralAssetStore {
  estimateGeneralAsset: EstimateGeneralAsset;
  estimateGeneralAssetAdditionalCharge: EstimateGeneralAssetAdditionalCharge[];
  estimateGeneralAssetCustomerDetails: EstimateGeneralAssetCustomerDetails;
  estimateGeneralAssetDate: EstimateGeneralAssetDate;
  estimateGeneralAssetDocumentAttachments: EstimateGeneralAssetDocumentAttachment[];
  estimateGeneralAssetImageAttachments: EstimateGeneralAssetImageAttachment[];
  estimateGeneralAssetMaterials: EstimateGeneralAssetMaterial[];
  estimateGeneralAssetTotal: EstimateGeneralAssetTotal;
  generalAsset: GeneralAsset;
}

export const addEstimateGeneralAsset = createAction<EstimateGeneralAsset>(
  'ADD_ESTIMATE_GENERAL_ASSET',
);
export const updateEstimateGeneralAsset = createAction<EstimateGeneralAsset>(
  'UPDATE_ESTIMATE_GENERAL_ASSET',
);
export const setEstimateGeneralAsset = createAction<EstimateGeneralAsset>(
  'SET_ESTIMATE_GENERAL_ASSET',
);

export const setGeneralAsset = createAction<GeneralAsset>('SET_GENERAL_ASSET');

export const initEstimateGeneralAsset = (varGeneralAssetId: number): EstimateGeneralAsset => ({
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
  generalAssetId: varGeneralAssetId,
  currentOdometerReading: 0,

  //Technical Narrative
  customerConcerns: '',
  findingsAndInstructions: '',
  safetyNotes: '',

  estimateGeneralAssetCustomerDetails: initEstimateGeneralAssetCustomerDetail(),
  estimateGeneralAssetDate: initEstimateGeneralAssetDate(),
  estimateGeneralAssetTotal: initEstimateGeneralAssetTotal(),
});

export const initGeneralAsset = (): GeneralAsset => ({
  ...newGeneralAsset(),
});

export const initialEstimateGeneralAssetState: EstimateGeneralAssetStore = {
  estimateGeneralAsset: initEstimateGeneralAsset(0),
  estimateGeneralAssetAdditionalCharge: initEstimateGeneralAssetAdditionalCharge,
  estimateGeneralAssetCustomerDetails: initEstimateGeneralAssetCustomerDetail(),
  estimateGeneralAssetDate: initEstimateGeneralAssetDate(),
  estimateGeneralAssetDocumentAttachments: initEstimateGeneralAssetDocumentAttachment,
  estimateGeneralAssetImageAttachments: initEstimateGeneralAssetImageAttachment,
  estimateGeneralAssetMaterials: initEstimateGeneralAssetMaterial,
  estimateGeneralAssetTotal: initEstimateGeneralAssetTotal(),
  generalAsset: initGeneralAsset(),
};

export const estimateGeneralAssetReducer = createReducer(
  initialEstimateGeneralAssetState,
  builder =>
    builder
      .addCase(setEstimateGeneralAsset, (state, action) => ({
        ...state,
        estimateGeneralAsset: action.payload,
      }))
      .addCase(setEstimateGeneralAssetAdditionalCharges, (state, action) => ({
        ...state,
        estimateGeneralAssetAdditionalCharge: action.payload,
      }))
      .addCase(setEstimateGeneralAssetCustomerDetail, (state, action) => ({
        ...state,
        estimateGeneralAssetCustomerDetails: action.payload,
      }))
      .addCase(setEstimateGeneralAssetDate, (state, action) => ({
        ...state,
        estimateGeneralAssetDate: action.payload,
      }))
      .addCase(setEstimateGeneralAssetDocumentAttachments, (state, action) => ({
        ...state,
        estimateGeneralAssetDocumentAttachments: action.payload,
      }))
      .addCase(setEstimateGeneralAssetImageAttachments, (state, action) => ({
        ...state,
        estimateGeneralAssetImageAttachments: action.payload,
      }))
      .addCase(setEstimateGeneralAssetMaterials, (state, action) => ({
        ...state,
        estimateGeneralAssetMaterials: action.payload,
      }))
      .addCase(setEstimateGeneralAssetTotal, (state, action) => ({
        ...state,
        estimateGeneralAssetTotal: action.payload,
      }))
      .addCase(setGeneralAsset, (state, action) => ({...state, generalAsset: action.payload})),
);
