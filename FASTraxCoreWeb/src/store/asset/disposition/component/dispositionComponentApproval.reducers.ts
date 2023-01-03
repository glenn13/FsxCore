import { createReducer, createAction } from '@reduxjs/toolkit';
import DispositionComponentApproval from '@app/entities/asset/disposition/component/DispositionComponentApproval';
import { generateNegativeNumber } from '@app/helpers/randoms';

export const addDispositionComponentApproval = createAction<DispositionComponentApproval>('ADD_DISPOSITION_COMPONENT_APPROVAL');
export const removeDispositionComponentApproval = createAction<DispositionComponentApproval>('REMOVE_DISPOSITION_COMPONENT_APPROVAL');
export const setDispositionComponentApprovals = createAction<DispositionComponentApproval[]>('SET_DISPOSITION_COMPONENT_APPROVAL');
export const updateDispositionComponentApproval = createAction<DispositionComponentApproval>('UPDATE_DISPOSITION_COMPONENT_APPROVAL');

export const initDispositionComponentApprovals: DispositionComponentApproval[] = [];

export const emptyDispositionComponentApproval = (ids?: number[]): DispositionComponentApproval => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        dispositionComponentId: 0,
        dateApproved: '',
        approverId: 0,
        designationId: 0,
        dispositionApprovalStatusId: 0,
    };
};

export const dispositionComponentApprovalReducer = createReducer(initDispositionComponentApprovals, builder =>
    builder
        .addCase(setDispositionComponentApprovals, (_, action) => action.payload)
        .addCase(addDispositionComponentApproval, (state, action) => ([...state, action.payload]))
        .addCase(updateDispositionComponentApproval, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionComponentApproval, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);