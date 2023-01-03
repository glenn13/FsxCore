import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import DispositionComponentDocument from '@app/entities/asset/disposition/component/DispositionComponentDocument';

export const addDispositionComponentDocument = createAction<DispositionComponentDocument>('ADD_DISPOSITION_COMPONENT_DOCUMENT_');
export const removeDispositionComponentDocument= createAction<DispositionComponentDocument>('REMOVE_DISPOSITION_COMPONENT_DOCUMENT_');
export const setDispositionComponentDocuments = createAction<DispositionComponentDocument[]>('SET_DISPOSITION_COMPONENT_DOCUMENT_');
export const updateDispositionComponentDocument = createAction<DispositionComponentDocument>('UPDATE_DISPOSITION_COMPONENT_DOCUMENT_');


export const initDispositionComponentDocuments: DispositionComponentDocument[] = [];

export const emptyDispositionComponentDocument = (ids?: number[]): DispositionComponentDocument => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        dispositionComponentId: 0,
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

export const dispositionComponentDocumentReducer = createReducer(initDispositionComponentDocuments, builder =>
    builder
        .addCase(setDispositionComponentDocuments, (_, action) => action.payload)
        .addCase(addDispositionComponentDocument, (state, action) => ([...state, action.payload]))
        .addCase(updateDispositionComponentDocument, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionComponentDocument, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);