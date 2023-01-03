import {createReducer, createAction} from '@reduxjs/toolkit';
import {generateNegativeNumber} from '../../../helpers/randoms';
import VehicleArmourDetail from '../../../entities/asset/inventory/VehicleArmourDetail';

export const addVehicleArmourDetail = createAction<VehicleArmourDetail>(
  'ADD_VEHICLE_ARMOUR_DETAIL',
);

export const setVehicleArmourDetail = createAction<VehicleArmourDetail[]>(
  'SET_VEHICLE_ARMOUR_DETAIL',
);

export const updateVehicleArmourDetail = createAction<VehicleArmourDetail>(
  'UPDATE_VEHICLE_ARMOUR_DETAIL',
);

export const removeVehicleArmourDetail = createAction<number>('REMOVE_VEHICLE_ARMOUR_DETAIL');

const initialState: VehicleArmourDetail[] = [];

export const emptyVehicleArmourDetail = (ids?: number[]): VehicleArmourDetail => ({
  id: generateNegativeNumber({flat: ids}),
  vehicleId: 0,
  companyName: '',
  armouredArea: '',
  description: '',
  remarks: '',
});

export const vehicleArmourDetails = createReducer(initialState, builder =>
  builder
    .addCase(addVehicleArmourDetail, (state, action) => [...state, action.payload])
    .addCase(setVehicleArmourDetail, (_, action) => [...action.payload])
    .addCase(updateVehicleArmourDetail, (state, action) => {
      const details = [...state];
      const index = details.findIndex(d => d.id === action.payload.id);

      details[index] = {...details[index], ...action.payload};

      return details;
    })
    .addCase(removeVehicleArmourDetail, (state, action) => [
      ...state.filter(vad => vad.id !== action.payload),
    ]),
);
