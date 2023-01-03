import { createReducer, createAction } from '@reduxjs/toolkit';

export const addComponentDocumentAttachment = createAction<ComponentDocumentAttachment>('ADD_COMPONENT_DOCUMENT_ATTACHMENT');
export const removeComponentDocumentAttachment= createAction<ComponentDocumentAttachment>('REMOVE_COMPONENT_DOCUMENT_ATTACHMENT');
export const setComponentDocumentAttachment = createAction<ComponentDocumentAttachment[]>('SET_COMPONENT_DOCUMENT_ATTACHMENT');
export const updateComponentDocumentAttachment = createAction<ComponentDocumentAttachment>('UPDATE_COMPONENT_DOCUMENT_ATTACHMENT');

export interface IComponentDocumentAttachment {
    current?: ComponentDocumentAttachment[];
}

export const initComponentDocumentAttachment: IComponentDocumentAttachment = {
    current: []
}

export const componentDocumentAttachmentReducer = createReducer(initComponentDocumentAttachment, builder =>
    builder
        .addCase(addComponentDocumentAttachment, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeComponentDocumentAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setComponentDocumentAttachment, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateComponentDocumentAttachment, (state, action) => {
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
