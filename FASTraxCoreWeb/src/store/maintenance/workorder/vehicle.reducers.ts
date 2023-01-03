import {createReducer, createAction} from '@reduxjs/toolkit';
import {generateUUID} from '@app/helpers/randoms';
import {newAsset} from '@app/entities/asset/inventory/Asset';
import {Vehicle} from '@app/entities/asset/inventory/Vehicle';
import WorkOrderVehicle from '@app/entities/maintenance/workorder/WorkOrderVehicle';
import WorkOrderVehicleAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderVehicleAdditionalCharge';
import WorkOrderVehicleCustomerDetails from '@app/entities/maintenance/workorder/WorkOrderVehicleCustomerDetails';
import WorkOrderVehicleDate from '@app/entities/maintenance/workorder/WorkOrderVehicleDate';
import WorkOrderVehicleDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderVehicleDocumentAttachment';
import WorkOrderVehicleImageAttachment from '@app/entities/maintenance/workorder/WorkOrderVehicleImageAttachment';
import WorkOrderVehicleLabour from '@app/entities/maintenance/workorder/WorkOrderVehicleLabour';
import WorkOrderVehicleMaterial from '@app/entities/maintenance/workorder/WorkOrderVehicleMaterial';
import WorkOrderVehicleMobileService from '@app/entities/maintenance/workorder/WorkOrderVehicleMobileService';
import WorkOrderVehicleTotal from '@app/entities/maintenance/workorder/WorkOrderVehicleTotal';

import {
  initWorkOrderVehicleAdditionalCharge,
  setWorkOrderVehicleAdditionalCharges,
} from './vehicleAdditionalCharge.reducers';
import {
  initWorkOrderVehicleCustomerDetail,
  setWorkOrderVehicleCustomerDetail,
} from './vehicleCustomerDetail.reducers';
import {initWorkOrderVehicleDate, setWorkOrderVehicleDate} from './vehicleDate.reducers';
import {
  initWorkOrderVehicleDocumentAttachment,
  setWorkOrderVehicleDocumentAttachments,
} from './vehicleDocumentAttachment.reducers';
import {
  initWorkOrderVehicleImageAttachment,
  setWorkOrderVehicleImageAttachments,
} from './vehicleImageAttachment.reducers';
import {initWorkOrderVehicleLabour, setWorkOrderVehicleLabours} from './vehicleLabour.reducers';
import {
  initWorkOrderVehicleMaterial,
  setWorkOrderVehicleMaterials,
} from './vehicleMaterial.reducers';
import {
  initWorkOrderVehicleMobileService,
  setWorkOrderVehicleMobileService,
} from './vehicleMobileService.reducers';
import {initWorkOrderVehicleTotal, setWorkOrderVehicleTotal} from './vehicleTotal.reducers';
import { AssetCategoryEnum } from '@app/helpers/asset/enum'

export interface WorkOrderVehicleStore {
  workOrderVehicle: WorkOrderVehicle;
  workOrderVehicleAdditionalCharge: WorkOrderVehicleAdditionalCharge[];
  workOrderVehicleCustomerDetails: WorkOrderVehicleCustomerDetails;
  workOrderVehicleDate: WorkOrderVehicleDate;
  workOrderVehicleDocumentAttachments: WorkOrderVehicleDocumentAttachment[];
  workOrderVehicleImageAttachments: WorkOrderVehicleImageAttachment[];
  workOrderVehicleLabours: WorkOrderVehicleLabour[];
  workOrderVehicleMaterials: WorkOrderVehicleMaterial[];
  workOrderVehicleMobileService: WorkOrderVehicleMobileService;
  workOrderVehicleTotal: WorkOrderVehicleTotal;
  vehicle: Vehicle;
}

export const addWorkOrderVehicle = createAction<WorkOrderVehicle>('ADD_WORK_ORDER_VEHICLE');
export const updateWorkOrderVehicle = createAction<WorkOrderVehicle>('UPDATE_WORK_ORDER_VEHICLE');
export const setWorkOrderVehicle = createAction<WorkOrderVehicle>('SET_WORK_ORDER_VEHICLE');

export const setVehicle = createAction<Vehicle>('SET_VEHICLE');

export const initWorkOrderVehicle = (): WorkOrderVehicle => ({
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
  vehicleId: 0,

  //Technical Narative
  customerConcerns: '',
  findingsAndInstructions: '',
  safetyNotes: '',

  workOrderVehicleCustomerDetails: initWorkOrderVehicleCustomerDetail(),
  workOrderVehicleDate: initWorkOrderVehicleDate(),
  workOrderVehicleMobileService: initWorkOrderVehicleMobileService(),
  workOrderVehicleTotal: initWorkOrderVehicleTotal()
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

export const initialWorkOrderVehicleState: WorkOrderVehicleStore = {
  workOrderVehicle: initWorkOrderVehicle(),
  workOrderVehicleAdditionalCharge: initWorkOrderVehicleAdditionalCharge,
  workOrderVehicleCustomerDetails: initWorkOrderVehicleCustomerDetail(),
  workOrderVehicleDate: initWorkOrderVehicleDate(),
  workOrderVehicleDocumentAttachments: initWorkOrderVehicleDocumentAttachment,
  workOrderVehicleImageAttachments: initWorkOrderVehicleImageAttachment,
  workOrderVehicleLabours: initWorkOrderVehicleLabour,
  workOrderVehicleMaterials: initWorkOrderVehicleMaterial,
  workOrderVehicleMobileService: initWorkOrderVehicleMobileService(),
  workOrderVehicleTotal: initWorkOrderVehicleTotal(),
  vehicle: initVehicle(),
};

export const workOrderVehicleReducer = createReducer(initialWorkOrderVehicleState, builder =>
  builder
    .addCase(setWorkOrderVehicle, (state, action) => ({...state, workOrderVehicle: action.payload}))
    .addCase(setWorkOrderVehicleAdditionalCharges, (state, action) => ({
      ...state,
      workOrderVehicleAdditionalCharge: action.payload,
    }))
    .addCase(setWorkOrderVehicleCustomerDetail, (state, action) => ({
      ...state,
      workOrderVehicleCustomerDetails: action.payload,
    }))
    .addCase(setWorkOrderVehicleDate, (state, action) => ({
      ...state,
      workOrderVehicleDate: action.payload,
    }))
    .addCase(setWorkOrderVehicleDocumentAttachments, (state, action) => ({
      ...state,
      workOrderVehicleDocumentAttachments: action.payload,
    }))
    .addCase(setWorkOrderVehicleImageAttachments, (state, action) => ({
      ...state,
      workOrderVehicleImageAttachments: action.payload,
    }))
    .addCase(setWorkOrderVehicleLabours, (state, action) => ({
      ...state,
      workOrderVehicleLabours: action.payload,
    }))
    .addCase(setWorkOrderVehicleMaterials, (state, action) => ({
      ...state,
      workOrderVehicleMaterials: action.payload,
    }))
    .addCase(setWorkOrderVehicleMobileService, (state, action) => ({
      ...state,
      workOrderVehicleMobileService: action.payload,
    }))
    .addCase(setWorkOrderVehicleTotal, (state, action) => ({
      ...state,
      workOrderVehicleTotal: action.payload,
    }))
    .addCase(setVehicle, (state, action) => ({...state, vehicle: action.payload})),
);
