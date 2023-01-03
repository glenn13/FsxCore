import { createReducer, createAction } from '@reduxjs/toolkit';

export const addComponentImageAttachment = createAction<ComponentImageAttachment>('ADD_COMPONENT_IMAGE_ATTACHMENT');
export const removeComponentImageAttachment= createAction<ComponentImageAttachment>('REMOVE_COMPONENT_IMAGE_ATTACHMENT');
export const setComponentImageAttachment = createAction<ComponentImageAttachment[]>('SET_COMPONENT_IMAGE_ATTACHMENT');
export const updateComponentImageAttachment = createAction<ComponentImageAttachment>('UPDATE_COMPONENT_IMAGE_ATTACHMENT');

export interface IComponentImageAttachment {
    current?: ComponentImageAttachment[];
}

export const initComponentImageAttachment: IComponentImageAttachment = {
    current: []
}

export const componentImageAttachmentReducer = createReducer(initComponentImageAttachment, builder =>
    builder
        .addCase(addComponentImageAttachment, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeComponentImageAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setComponentImageAttachment, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateComponentImageAttachment, (state, action) => {
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
