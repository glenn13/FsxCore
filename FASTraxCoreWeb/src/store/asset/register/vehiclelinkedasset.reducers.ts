import { createReducer, createAction } from '@reduxjs/toolkit';

export const addVehicleLinkedAsset = createAction<VehicleLinkedAsset>('ADD_VEHICLE_LINKED_ASSET');
export const removeVehicleLinkedAsset= createAction<VehicleLinkedAsset>('REMOVE_VEHICLE_LINKED_ASSET');
export const setVehicleLinkedAsset = createAction<VehicleLinkedAsset[]>('SET_VEHICLE_LINKED_ASSET');
export const updateVehicleLinkedAsset = createAction<VehicleLinkedAsset>('UPDATE_VEHICLE_LINKED_ASSET');

export interface IVehicleLinkedAsset {
    current?: VehicleLinkedAsset[];
}

export const initVehicleLinkedAsset: IVehicleLinkedAsset = {
    current: []
}

export const vehicleLinkedAssetReducer = createReducer(initVehicleLinkedAsset, builder =>
    builder
        .addCase(addVehicleLinkedAsset, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeVehicleLinkedAsset, (state, action) => {
            if(state.current !== undefined) {
                if (action.payload.tempId !== undefined) {
                    state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
                } else {
                    state.current = state.current?.filter(x => x.id !== action.payload.id);
                }
            }
        })
        .addCase(setVehicleLinkedAsset, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateVehicleLinkedAsset, (state, action) => {
            if (state.current !== undefined) {
                var index: number = 0;
                if (action.payload.tempId !== undefined) {
                    index = state.current.findIndex(aai => aai.tempId === action.payload.tempId);
                } else {
                    index = state.current.findIndex(aai => aai.id === action.payload.id);
                }
                state.current[index] = action.payload;
            }
        })  
);
