import {createReducer, createAction} from '@reduxjs/toolkit';
import {generateUUID} from '@app/helpers/randoms';
import {newAsset} from '@app/entities/asset/inventory/Asset';
import {Vehicle} from '@app/entities/asset/inventory/Vehicle';
import EstimateVehicle from '@app/entities/maintenance/estimate/EstimateVehicle';
import EstimateVehicleAdditionalCharge from '@app/entities/maintenance/estimate/EstimateVehicleAdditionalCharge';
import EstimateVehicleCustomerDetails from '@app/entities/maintenance/estimate/EstimateVehicleCustomerDetails';
import EstimateVehicleDate from '@app/entities/maintenance/estimate/EstimateVehicleDate';
import EstimateVehicleDocumentAttachment from '@app/entities/maintenance/estimate/EstimateVehicleDocumentAttachment';
import EstimateVehicleImageAttachment from '@app/entities/maintenance/estimate/EstimateVehicleImageAttachment';
import EstimateVehicleMaterial from '@app/entities/maintenance/estimate/EstimateVehicleMaterial';
import EstimateVehicleTotal from '@app/entities/maintenance/estimate/EstimateVehicleTotal';

import {
  initEstimateVehicleAdditionalCharge,
  setEstimateVehicleAdditionalCharges,
} from './vehicleAdditionalCharge.reducers';
import {
  initEstimateVehicleCustomerDetail,
  setEstimateVehicleCustomerDetail,
} from './vehicleCustomerDetail.reducers';
import {initEstimateVehicleDate, setEstimateVehicleDate} from './vehicleDate.reducers';
import {
  initEstimateVehicleDocumentAttachment,
  setEstimateVehicleDocumentAttachments,
} from './vehicleDocumentAttachment.reducers';
import {
  initEstimateVehicleImageAttachment,
  setEstimateVehicleImageAttachments,
} from './vehicleImageAttachment.reducers';
import {initEstimateVehicleMaterial, setEstimateVehicleMaterials} from './vehicleMaterial.reducers';
import {initEstimateVehicleTotal, setEstimateVehicleTotal} from './vehicleTotal.reducers';
import { AssetCategoryEnum } from '@app/helpers/asset/enum'

export interface EstimateVehicleStore {
  estimateVehicle: EstimateVehicle;
  estimateVehicleAdditionalCharge: EstimateVehicleAdditionalCharge[];
  estimateVehicleCustomerDetails: EstimateVehicleCustomerDetails;
  estimateVehicleDate: EstimateVehicleDate;
  estimateVehicleDocumentAttachments: EstimateVehicleDocumentAttachment[];
  estimateVehicleImageAttachments: EstimateVehicleImageAttachment[];
  estimateVehicleMaterials: EstimateVehicleMaterial[];
  estimateVehicleTotal: EstimateVehicleTotal;
  vehicle: Vehicle;
}

export const addEstimateVehicle = createAction<EstimateVehicle>('ADD_ESTIMATE_VEHICLE');
export const updateEstimateVehicle = createAction<EstimateVehicle>('UPDATE_ESTIMATE_VEHICLE');
export const setEstimateVehicle = createAction<EstimateVehicle>('SET_ESTIMATE_VEHICLE');

export const setVehicle = createAction<Vehicle>('SET_VEHICLE');

export const initEstimateVehicle = (varVehicleId: number): EstimateVehicle => ({
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
  vehicleId: varVehicleId,
  currentOdometerReading: 0,

  //Technical Narrative
  customerConcerns: '',
  findingsAndInstructions: '',
  safetyNotes: '',

  estimateVehicleCustomerDetails: initEstimateVehicleCustomerDetail(),
  estimateVehicleDate: initEstimateVehicleDate(),
  estimateVehicleTotal: initEstimateVehicleTotal(),
});

export const initVehicle = (): Vehicle => ({
    ...newAsset(),
    id: 0,
    assetCategoryId: AssetCategoryEnum.Vehicle,
    pickupDate: new Date(),
    assetLocationId: 0,
    vehicleSecondaryDetailId: 0,
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
    tireFront: '',
    tireRear: '',
    maxCapacity: 0,
    doorCount: 0,
});

export const initialEstimateVehicleState: EstimateVehicleStore = {
  estimateVehicle: initEstimateVehicle(0),
  estimateVehicleAdditionalCharge: initEstimateVehicleAdditionalCharge,
  estimateVehicleCustomerDetails: initEstimateVehicleCustomerDetail(),
  estimateVehicleDate: initEstimateVehicleDate(),
  estimateVehicleDocumentAttachments: initEstimateVehicleDocumentAttachment,
  estimateVehicleImageAttachments: initEstimateVehicleImageAttachment,
  estimateVehicleMaterials: initEstimateVehicleMaterial,
  estimateVehicleTotal: initEstimateVehicleTotal(),
  vehicle: initVehicle(),
};

export const estimateVehicleReducer = createReducer(initialEstimateVehicleState, builder =>
  builder
    .addCase(setEstimateVehicle, (state, action) => ({...state, estimateVehicle: action.payload}))
    .addCase(setEstimateVehicleAdditionalCharges, (state, action) => ({
      ...state,
      estimateVehicleAdditionalCharge: action.payload,
    }))
    .addCase(setEstimateVehicleCustomerDetail, (state, action) => ({
      ...state,
      estimateVehicleCustomerDetails: action.payload,
    }))
    .addCase(setEstimateVehicleDate, (state, action) => ({
      ...state,
      estimateVehicleDate: action.payload,
    }))
    .addCase(setEstimateVehicleDocumentAttachments, (state, action) => ({
      ...state,
      estimateVehicleDocumentAttachments: action.payload,
    }))
    .addCase(setEstimateVehicleImageAttachments, (state, action) => ({
      ...state,
      estimateVehicleImageAttachments: action.payload,
    }))
    .addCase(setEstimateVehicleMaterials, (state, action) => ({
      ...state,
      estimateVehicleMaterials: action.payload,
    }))
    .addCase(setEstimateVehicleTotal, (state, action) => ({
      ...state,
      estimateVehicleTotal: action.payload,
    }))
    .addCase(setVehicle, (state, action) => ({...state, vehicle: action.payload})),
);
