import { createReducer, createAction } from '@reduxjs/toolkit';
import EstimateGeneralAssetDate from '@app/entities/maintenance/estimate/EstimateGeneralAssetDate';

export const setEstimateGeneralAssetDate = createAction<EstimateGeneralAssetDate>('SET_ESTIMATE_GENERAL_ASSET_DATE');

export const initEstimateGeneralAssetDate = (): EstimateGeneralAssetDate => ({
    id: 0,
    estimateGeneralAssetId: 0,

    dateApprovedDeclined: new Date(),
    dateClosed: new Date(),
    dateCreated: new Date(),
    dateSubmittedForApproval: new Date()
});

export const estimateGeneralAssetDateReducer = createReducer(initEstimateGeneralAssetDate(), builder =>
    builder.addCase(setEstimateGeneralAssetDate, (_, action) => ({ ...action.payload }))
);
