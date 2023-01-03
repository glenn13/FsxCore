import DispositionComponent from '@app/entities/asset/disposition/component/DispositionComponent';
import { createReducer, createAction } from '@reduxjs/toolkit';

export const addDispositionComponent = createAction<DispositionComponent>('ADD_DISPOSITION_COMPONENT');
export const removeDispositionComponent= createAction<DispositionComponent>('REMOVE_DISPOSITION_COMPONENT');
export const setDispositionComponent = createAction<DispositionComponent>('SET_DISPOSITION_COMPONENT');
export const updateDispositionComponent = createAction<DispositionComponent>('UPDATE_DISPOSITION_COMPONENT');

export interface IDispositionComponent {
    current?: DispositionComponent[];
}

export const initDispositionComponent: IDispositionComponent = {
    current: []
}

export const dispositionComponentReducer = createReducer(initDispositionComponent, builder =>
    builder
        .addCase(addDispositionComponent, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeDispositionComponent, (state, action) => {
            if(state.current !== undefined) {
                state.current = state.current.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setDispositionComponent, (state, action) => {
            if(state.current !== undefined) {
                var index: number = 0;
                index = state.current.findIndex(aai => aai.id === action.payload.id);
                state.current[index] = action.payload;
            }
        })
        .addCase(updateDispositionComponent, (state, action) => {
            if(state.current !== undefined) {
                var index: number = 0;
                index = state.current.findIndex(aai => aai.id === action.payload.id);
                state.current[index] = action.payload;
            }
        })
);