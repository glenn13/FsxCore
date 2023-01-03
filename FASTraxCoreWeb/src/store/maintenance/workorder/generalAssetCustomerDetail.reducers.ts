import {createAction, createReducer} from '@reduxjs/toolkit';

import Customer from '@app/entities/crm/sales/Customer';
import WorkOrderGeneralAssetCustomerDetails from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetCustomerDetails';

export const addWorkOrderGeneralAssetCustomerDetail = createAction<
  WorkOrderGeneralAssetCustomerDetails
>('ADD_WORK_ORDER_GENERAL_ASSET_CUSTOMER_DETAIL');
export const setWorkOrderGeneralAssetCustomerDetail = createAction<
  WorkOrderGeneralAssetCustomerDetails
>('SET_WORK_ORDER_GENERAL_ASSET_CUSTOMER_DETAIL');
export const updateWorkOrderGeneralAssetCustomerDetail = createAction<
  WorkOrderGeneralAssetCustomerDetails
>('UPDATE_WORK_ORDER_GENERAL_ASSET_CUSTOMER_DETAIL');

const initCustomer = (): Customer => ({
  id: 0,
  code: '',
  name: '',
  address: '',
  contactName: '',
  contactNo: '',
  customerTypeId: 0,
  websiteUrl: '',
});

export const initWorkOrderGeneralAssetCustomerDetail = (): WorkOrderGeneralAssetCustomerDetails => ({
  id: 0,
  workOrderGeneralAssetId: 0,
  customer: initCustomer(),
  pocEmailAddress: '',
  pocMobileNumber: '',
  pointOfContactName: '',
});

export const workOrderGeneralAssetCustomerDetailReducer = createReducer(
  initWorkOrderGeneralAssetCustomerDetail(),
  builder =>
    builder.addCase(setWorkOrderGeneralAssetCustomerDetail, (_, action) => ({...action.payload})),
);
