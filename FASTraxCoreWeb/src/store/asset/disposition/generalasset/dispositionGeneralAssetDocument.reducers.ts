import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import DispositionGeneralAssetDocument from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetDocument';

export const addDispositionGeneralAssetDocument = createAction<DispositionGeneralAssetDocument>('ADD_DISPOSITION_GENERAL_ASSET_DOCUMENT_');
export const removeDispositionGeneralAssetDocument = createAction<DispositionGeneralAssetDocument>('REMOVE_DISPOSITION_GENERAL_ASSET_DOCUMENT_');
export const setDispositionGeneralAssetDocuments = createAction<DispositionGeneralAssetDocument[]>('SET_DISPOSITION_GENERAL_ASSET_DOCUMENT_');
export const updateDispositionGeneralAssetDocument = createAction<DispositionGeneralAssetDocument>('UPDATE_DISPOSITION_GENERAL_ASSET_DOCUMENT_');

export const initDispositionGeneralAssetDocuments: DispositionGeneralAssetDocument[] = [];

export const emptyDispositionGeneralAssetDocument = (ids?: number[]): DispositionGeneralAssetDocument => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        dispositionGeneralAssetId: 0,
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

export const dispositionGeneralAssetDocumentReducer = createReducer(initDispositionGeneralAssetDocuments, builder =>
    builder
        .addCase(setDispositionGeneralAssetDocuments, (_, action) => action.payload)
        .addCase(addDispositionGeneralAssetDocument, (state, action) => ([...state, action.payload]))
        .addCase(updateDispositionGeneralAssetDocument, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionGeneralAssetDocument, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);