import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import DispositionVehicleDocument from '@app/entities/asset/disposition/vehicle/DispositionVehicleDocument';

export const addDispositionVehicleDocument = createAction<DispositionVehicleDocument>('ADD_DISPOSITION_VEHICLE_DOCUMENT_');
export const removeDispositionVehicleDocument= createAction<DispositionVehicleDocument>('REMOVE_DISPOSITION_VEHICLE_DOCUMENT_');
export const setDispositionVehicleDocuments = createAction<DispositionVehicleDocument[]>('SET_DISPOSITION_VEHICLE_DOCUMENT_');
export const updateDispositionVehicleDocument = createAction<DispositionVehicleDocument>('UPDATE_DISPOSITION_VEHICLE_DOCUMENT_');


export const initDispositionVehicleDocuments: DispositionVehicleDocument[] = [];

export const emptyDispositionVehicleDocument = (ids?: number[]): DispositionVehicleDocument => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        dispositionVehicleId: 0,
        action: '',
        createdById: 0,
        dateUploaded: new Date(),
        file: '',
        fileName: '',
        fileSize: 0,
        fileType: '',
        remarks: ''
    };
};

export const dispositionVehicleDocumentReducer = createReducer(initDispositionVehicleDocuments, builder =>
    builder
        .addCase(setDispositionVehicleDocuments, (_, action) => action.payload)
        .addCase(addDispositionVehicleDocument, (state, action) => ([...state, action.payload]))
        .addCase(updateDispositionVehicleDocument, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionVehicleDocument, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);