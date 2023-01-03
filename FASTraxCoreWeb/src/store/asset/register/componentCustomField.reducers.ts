import {createAction, createReducer} from '@reduxjs/toolkit';

export const addComponentCustomField = createAction<ComponentCustomField>(
  'ADD_COMPONENT_CUSTOM_FIELD',
);
export const removeComponentCustomField = createAction<ComponentCustomField>(
  'REMOVE_COMPONENT_CUSTOM_FIELD',
);
export const setComponentCustomField = createAction<ComponentCustomField[]>(
  'SET_COMPONENT_CUSTOM_FIELD',
);
export const updateComponentCustomField = createAction<ComponentCustomField>(
  'UPDATE_COMPONENT_CUSTOM_FIELD',
);

export interface IComponentCustomField {
  current?: ComponentCustomField[];
}

export const initComponentCustomField: IComponentCustomField = {
  current: [],
};

export const componentCustomFieldReducer = createReducer(initComponentCustomField, builder =>
  builder
    .addCase(addComponentCustomField, (state, action) => {
      state.current?.push({...action.payload});
    })
    .addCase(removeComponentCustomField, (state, action) => {
      state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
    })
    .addCase(setComponentCustomField, (state, action) => {
      state.current = action.payload;
    })
    .addCase(updateComponentCustomField, (state, action) => {
      if (state.current !== undefined) {
        var index: number = 0;
        index = state.current.findIndex(x => x.tempId === action.payload.tempId);
        state.current[index] = action.payload;
      }
    }),
);
