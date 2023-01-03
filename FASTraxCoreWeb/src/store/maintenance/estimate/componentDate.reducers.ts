import { createReducer, createAction } from '@reduxjs/toolkit';
import EstimateComponentDate from '@app/entities/maintenance/estimate/EstimateComponentDate';

export const setEstimateComponentDate = createAction<EstimateComponentDate>('SET_ESTIMATE_COMPONENT_DATE');

export const initEstimateComponentDate = (): EstimateComponentDate => ({
    id: 0,
    estimateComponentId: 0,

    dateApprovedDeclined: new Date(),
    dateClosed: new Date(),
    dateCreated: new Date(),
    dateSubmittedForApproval: new Date()
});

export const estimateComponentDateReducer = createReducer(initEstimateComponentDate(), builder =>
    builder.addCase(setEstimateComponentDate, (_, action) => ({ ...action.payload }))
);
