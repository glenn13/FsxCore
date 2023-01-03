import { createReducer, createAction } from '@reduxjs/toolkit';

export const addComponentDepreciationDetail = createAction<ComponentDepreciationDetail>('ADD_COMPONENT_DEPRECIATION_DETAIL');
export const removeComponentDepreciationDetail= createAction<ComponentDepreciationDetail>('REMOVE_COMPONENT_DEPRECIATION_DETAIL');
export const setComponentDepreciationDetail = createAction<ComponentDepreciationDetail[]>('SET_COMPONENT_DEPRECIATION_DETAIL');
export const updateComponentDepreciationDetail = createAction<ComponentDepreciationDetail>('UPDATE_COMPONENT_DEPRECIATION_DETAIL');

export interface IComponentDepreciationDetail {
    current?: ComponentDepreciationDetail[];
}

export const initComponentDepreciationDetail: IComponentDepreciationDetail = {
    current: []
}

export const componentDepreciationDetailReducer = createReducer(initComponentDepreciationDetail, builder =>
    builder
        .addCase(addComponentDepreciationDetail, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeComponentDepreciationDetail, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setComponentDepreciationDetail, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateComponentDepreciationDetail, (state, action) => {
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