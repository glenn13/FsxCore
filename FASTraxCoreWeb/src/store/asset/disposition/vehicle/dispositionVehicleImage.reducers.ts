import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import DispositionVehicleImage from '@app/entities/asset/disposition/vehicle/DispositionVehicleImage';

export const addDispositionVehicleImage = createAction<DispositionVehicleImage>('ADD_DISPOSITION_VEHICLE_IMAGE_');
export const setDispositionVehicleImages = createAction<DispositionVehicleImage[]>('SET_DISPOSITION_VEHICLE_IMAGE_');
export const updateDispositionVehicleImage = createAction<DispositionVehicleImage>('UPDATE_DISPOSITION_VEHICLE_IMAGE_');
export const removeDispositionVehicleImage = createAction<DispositionVehicleImage>('REMOVE_DISPOSITION_VEHICLE_IMAGE_');

export const initDispositionVehicleImages: DispositionVehicleImage[] = [];

export const emptyDispositionVehicleImage = (ids?: number[]): DispositionVehicleImage => {
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
        dispositionVehicleId: 0,
    };
};

export const dispositionVehicleImageReducer = createReducer(initDispositionVehicleImages, builder =>
    builder
        .addCase(setDispositionVehicleImages, (_, action) => action.payload)
        .addCase(addDispositionVehicleImage, (state, action) => {

            if (!action.payload.isDefault) return [...state, action.payload];

            const result: DispositionVehicleImage[] = [];

            state.forEach(image => result.push({ ...image, isDefault: false }));

            result.push(action.payload);

            return result;
        })

        .addCase(updateDispositionVehicleImage, (state, action) => {

            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionVehicleImage, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);
