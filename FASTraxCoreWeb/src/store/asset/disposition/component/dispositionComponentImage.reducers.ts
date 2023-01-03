import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import DispositionComponentImage from '@app/entities/asset/disposition/component/DispositionComponentImage';

export const addDispositionComponentImage = createAction<DispositionComponentImage>('ADD_DISPOSITION_COMPONENT_IMAGE_');
export const setDispositionComponentImages = createAction<DispositionComponentImage[]>('SET_DISPOSITION_COMPONENT_IMAGE_');
export const updateDispositionComponentImage = createAction<DispositionComponentImage>('UPDATE_DISPOSITION_COMPONENT_IMAGE_');
export const removeDispositionComponentImage = createAction<DispositionComponentImage>('REMOVE_DISPOSITION_COMPONENT_IMAGE_');

export const initDispositionComponentImages: DispositionComponentImage[] = [];

export const emptyDispositionComponentImage = (ids?: number[]): DispositionComponentImage => {
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
        dispositionComponentId: 0,
    };
};

export const dispositionComponentImageReducer = createReducer(initDispositionComponentImages, builder =>
    builder
        .addCase(setDispositionComponentImages, (_, action) => action.payload)
        .addCase(addDispositionComponentImage, (state, action) => {

            if (!action.payload.isDefault) return [...state, action.payload];

            const result: DispositionComponentImage[] = [];

            state.forEach(image => result.push({ ...image, isDefault: false }));

            result.push(action.payload);

            return result;
        })

        .addCase(updateDispositionComponentImage, (state, action) => {

            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionComponentImage, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);
