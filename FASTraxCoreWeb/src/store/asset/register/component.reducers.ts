import {createAction, createReducer} from '@reduxjs/toolkit';

export const addComponent = createAction<Component>('ADD_COMPONENT');
export const removeComponent = createAction<Component>('REMOVE_COMPONENT');
export const setComponent = createAction<Component>('SET_COMPONENT');
export const updateComponent = createAction<Component>('UPDATE_COMPONENT');

export interface IComponent {
  current?: Component[];
}

export const initComponent: IComponent = {
  current: [],
};

export const componentReducer = createReducer(initComponent, builder =>
  builder
    .addCase(addComponent, (state, action) => {
      state.current?.push({...action.payload});
    })
    .addCase(removeComponent, (state, action) => {
      state.current = state.current?.filter(x => x.id !== action.payload.id);
    })
    .addCase(setComponent, (state, action) => {
      if (state.current !== undefined) {
        var index: number = 0;
        index = state.current?.findIndex(aai => aai.id === action.payload.id);
        state.current[index] = action.payload;
      }
    })
    .addCase(updateComponent, (state, action) => {
      if (state.current !== undefined) {
        var index: number = 0;
        index = state.current?.findIndex(aai => aai.id === action.payload.id);
        state.current[index] = action.payload;
      }
    }),
);
