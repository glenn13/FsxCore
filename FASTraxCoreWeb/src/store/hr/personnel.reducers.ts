import {createAction, createReducer} from '@reduxjs/toolkit';
import Personnel from '@app/entities/hr/Personnel';

export const addPersonnel = createAction<Personnel>('ADD_PERSONNEL');
export const removePersonnel = createAction<Personnel>('REMOVE_PERSONNEL');
export const setPersonnel = createAction<Personnel>('SET_PERSONNEL');
export const updatePersonnel = createAction<Personnel>('UPDATE_PERSONNEL');

export interface IPersonnel {
  current?: Personnel[];
}

export const initPersonnel: IPersonnel = {
  current: [],
};

export const personnelReducer = createReducer(initPersonnel, builder =>
  builder
    .addCase(addPersonnel, (state, action) => {
      state.current?.push({...action.payload});
    })
    .addCase(removePersonnel, (state, action) => {
      state.current = state.current?.filter(x => x.id !== action.payload.id);
    })
    .addCase(setPersonnel, (state, action) => {
      if (state.current !== undefined) {
        var index: number = 0;
        index = state.current?.findIndex(aai => aai.id === action.payload.id);
        state.current[index] = action.payload;
      }
    })
    .addCase(updatePersonnel, (state, action) => {
      if (state.current !== undefined) {
        var index: number = 0;
        index = state.current?.findIndex(aai => aai.id === action.payload.id);
        state.current[index] = action.payload;
      }
    }),
);

