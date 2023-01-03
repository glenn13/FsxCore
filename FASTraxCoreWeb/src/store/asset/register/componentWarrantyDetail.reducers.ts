import {createAction, createReducer} from '@reduxjs/toolkit';

export const addComponentWarrantyDetail = createAction<ComponentWarrantyDetail>(
  'ADD_COMPONENT_WARRANTY_DETAIL',
);
export const removeComponentWarrantyDetail = createAction<ComponentWarrantyDetail>(
  'REMOVE_COMPONENT_WARRANTY_DETAIL',
);
export const setComponentWarrantyDetail = createAction<ComponentWarrantyDetail[]>(
  'SET_COMPONENT_WARRANTY_DETAIL',
);
export const updateComponentWarrantyDetail = createAction<ComponentWarrantyDetail>(
  'UPDATE_COMPONENT_WARRANTY_DETAIL',
);

export interface IComponentWarrantyDetail {
  current?: ComponentWarrantyDetail[];
}

export const initComponentWarrantyDetail: IComponentWarrantyDetail = {
  current: [],
};

export const componentWarrantyDetailReducer = createReducer(
  initComponentWarrantyDetail,
  builder =>
    builder
      .addCase(addComponentWarrantyDetail, (state, action) => {
        state.current?.push({...action.payload});
      })
      .addCase(removeComponentWarrantyDetail, (state, action) => {
        if (action.payload.tempId !== undefined) {
          state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
        } else {
          state.current = state.current?.filter(x => x.id !== action.payload.id);
        }
      })
      .addCase(setComponentWarrantyDetail, (state, action) => {
        state.current = action.payload;
      })
      .addCase(updateComponentWarrantyDetail, (state, action) => {
        if (state.current !== undefined) {
          var index: number = 0;
          if (action.payload.tempId !== undefined) {
            index = state.current.findIndex(aai => aai.tempId === action.payload.tempId);
          } else {
            index = state.current.findIndex(aai => aai.id === action.payload.id);
          }
          state.current[index] = action.payload;
        }
      }),
);
