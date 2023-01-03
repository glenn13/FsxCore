import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import DispositionGeneralAssetImage from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetImage';

export const addDispositionGeneralAssetImage = createAction<DispositionGeneralAssetImage>('ADD_DISPOSITION_GENERAL_ASSET_IMAGE_');
export const setDispositionGeneralAssetImages = createAction<DispositionGeneralAssetImage[]>('SET_DISPOSITION_GENERAL_ASSET_IMAGE_');
export const updateDispositionGeneralAssetImage = createAction<DispositionGeneralAssetImage>('UPDATE_DISPOSITION_GENERAL_ASSET_IMAGE_');
export const removeDispositionGeneralAssetImage = createAction<DispositionGeneralAssetImage>('REMOVE_DISPOSITION_GENERAL_ASSET_IMAGE_');

export const initDispositionGeneralAssetImages: DispositionGeneralAssetImage[] = [];

export const emptyDispositionGeneralAssetImage = (ids?: number[]): DispositionGeneralAssetImage => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        dateUploaded: new Date(),
        fileName: '',
        fileSize: 0,
        image: '',
        imageType: '',
        isDefault: false,
        isPrintable: false,
        orientation: '',
        remarks: '',
        dispositionGeneralAssetId: 0,
    };
};

export const dispositionGeneralAssetImageReducer = createReducer(initDispositionGeneralAssetImages, builder =>
    builder
        .addCase(setDispositionGeneralAssetImages, (_, action) => action.payload)
        .addCase(addDispositionGeneralAssetImage, (state, action) => {

            if (!action.payload.isDefault) return [...state, action.payload];

            const result: DispositionGeneralAssetImage[] = [];

            state.forEach(image => result.push({ ...image, isDefault: false }));

            result.push(action.payload);

            return result;
        })

        .addCase(updateDispositionGeneralAssetImage, (state, action) => {

            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionGeneralAssetImage, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);
