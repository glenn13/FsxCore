import { createReducer, createAction } from '@reduxjs/toolkit';
import DispositionVehicleApproval from '@app/entities/asset/disposition/vehicle/DispositionVehicleApproval';
import { generateNegativeNumber } from '@app/helpers/randoms';

export const addDispositionVehicleApproval = createAction<DispositionVehicleApproval>('ADD_DISPOSITION_VEHICLE_APPROVAL');
export const removeDispositionVehicleApproval = createAction<DispositionVehicleApproval>('REMOVE_DISPOSITION_VEHICLE_APPROVAL');
export const setDispositionVehicleApprovals = createAction<DispositionVehicleApproval[]>('SET_DISPOSITION_VEHICLE_APPROVAL');
export const updateDispositionVehicleApproval = createAction<DispositionVehicleApproval>('UPDATE_DISPOSITION_VEHICLE_APPROVAL');

export const initDispositionVehicleApprovals: DispositionVehicleApproval[] = [];

export const emptyDispositionVehicleApproval = (ids?: number[]): DispositionVehicleApproval => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        dispositionVehicleId: 0,
        dateApproved: '',
        approverId: 0,
        designationId: 0,
        dispositionApprovalStatusId: 0,
    };
};

export const dispositionVehicleApprovalReducer = createReducer(initDispositionVehicleApprovals, builder =>
    builder
        .addCase(setDispositionVehicleApprovals, (_, action) => action.payload)
        .addCase(addDispositionVehicleApproval, (state, action) => ([...state, action.payload]))
        .addCase(updateDispositionVehicleApproval, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionVehicleApproval, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);