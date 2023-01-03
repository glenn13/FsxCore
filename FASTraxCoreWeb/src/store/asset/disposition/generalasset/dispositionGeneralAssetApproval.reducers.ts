import { createReducer, createAction } from '@reduxjs/toolkit';
import DispositionGeneralAssetApproval from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetApproval';
import { generateNegativeNumber } from '@app/helpers/randoms';

export const addDispositionGeneralAssetApproval = createAction<DispositionGeneralAssetApproval>('ADD_DISPOSITION_GENERAL_ASSET_APPROVAL');
export const removeDispositionGeneralAssetApproval = createAction<DispositionGeneralAssetApproval>('REMOVE_DISPOSITION_GENERAL_ASSET_APPROVAL');
export const setDispositionGeneralAssetApprovals = createAction<DispositionGeneralAssetApproval[]>('SET_DISPOSITION_GENERAL_ASSET_APPROVAL');
export const updateDispositionGeneralAssetApproval = createAction<DispositionGeneralAssetApproval>('UPDATE_DISPOSITION_GENERAL_ASSET_APPROVAL');

export const initDispositionGeneralAssetApprovals: DispositionGeneralAssetApproval[] = [];

export const emptyDispositionGeneralAssetApproval = (ids?: number[]): DispositionGeneralAssetApproval => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        dispositionGeneralAssetId: 0,
        dateApproved: '',
        approverId: 0,
        designationId: 0,
        dispositionApprovalStatusId: 0,
    };
};

export const dispositionGeneralAssetApprovalReducer = createReducer(initDispositionGeneralAssetApprovals, builder =>
    builder
        .addCase(setDispositionGeneralAssetApprovals, (_, action) => action.payload)
        .addCase(addDispositionGeneralAssetApproval, (state, action) => ([...state, action.payload]))
        .addCase(updateDispositionGeneralAssetApproval, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionGeneralAssetApproval, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);