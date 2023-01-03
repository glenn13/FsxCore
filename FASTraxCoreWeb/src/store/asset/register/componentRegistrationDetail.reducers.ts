import { createReducer, createAction } from '@reduxjs/toolkit';

import _ from 'lodash';

export const addComponentRegistrationDetail = createAction<ComponentRegistrationDetail>('ADD_COMPONENT_REGISTRATION_DETAIL');
export const removeComponentRegistrationDetail= createAction<ComponentRegistrationDetail>('REMOVE_COMPONENT_REGISTRATION_DETAIL');
export const setComponentRegistrationDetail = createAction<ComponentRegistrationDetail[]>('SET_COMPONENT_REGISTRATION_DETAIL');
export const updateComponentRegistrationDetail = createAction<ComponentRegistrationDetail>('UPDATE_COMPONENT_REGISTRATION_DETAIL');

export interface IComponentRegistrationDetail {
    current?: ComponentRegistrationDetail[];
}

export const initComponentRegistrationDetail: IComponentRegistrationDetail = {
    current: []
}

export const componentRegistrationDetailReducer = createReducer(initComponentRegistrationDetail, builder =>
    builder
        .addCase(addComponentRegistrationDetail, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeComponentRegistrationDetail, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setComponentRegistrationDetail, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateComponentRegistrationDetail, (state, action) => {
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
