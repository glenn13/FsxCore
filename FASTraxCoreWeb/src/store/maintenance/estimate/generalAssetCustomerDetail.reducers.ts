import {createAction, createReducer} from '@reduxjs/toolkit';

import Customer from '@app/entities/crm/sales/Customer';
import EstimateGeneralAssetCustomerDetails from '@app/entities/maintenance/estimate/EstimateGeneralAssetCustomerDetails';

export const addEstimateGeneralAssetCustomerDetail = createAction<
  EstimateGeneralAssetCustomerDetails
>('ADD_ESTIMATE_GENERAL_ASSET_CUSTOMER_DETAIL');
export const setEstimateGeneralAssetCustomerDetail = createAction<
  EstimateGeneralAssetCustomerDetails
>('SET_ESTIMATE_GENERAL_ASSET_CUSTOMER_DETAIL');
export const updateEstimateGeneralAssetCustomerDetail = createAction<
  EstimateGeneralAssetCustomerDetails
>('UPDATE_ESTIMATE_GENERAL_ASSET_CUSTOMER_DETAIL');

const initCustomer = (): Customer => ({
  id: 0,
  code: 'CUSTCODE111',
  name: 'CUSTOMERNAME',
  address: '',
  contactName: '',
  contactNo: '',
  customerTypeId: 0,
  websiteUrl: '',
});

export const initEstimateGeneralAssetCustomerDetail = (): EstimateGeneralAssetCustomerDetails => ({
  id: 0,
  estimateGeneralAssetId: 0,
  customer: initCustomer(),
  pocEmailAddress: 'test@gmail.com',
  pocMobileNumber: '+97198292833',
  pointOfContactName: 'John Doe',
});

export const estimateGeneralAssetCustomerDetailReducer = createReducer(
  initEstimateGeneralAssetCustomerDetail(),
  builder =>
    builder.addCase(setEstimateGeneralAssetCustomerDetail, (_, action) => ({...action.payload})),
);
