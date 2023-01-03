import {createReducer, createAction} from '@reduxjs/toolkit';
import {EntityAttachmentDocument} from '../../../entities/global/EntityAttachmentDocument';

export const addDocuments = createAction<EntityAttachmentDocument>('ADD_ATTACHMENT_DOCUMENTS');

export const setDocuments = createAction<EntityAttachmentDocument[]>('SET_ATTACHMENT_DOCUMENTS');

export const updateDocuments = createAction<EntityAttachmentDocument>(
  'UPDATE_ATTACHMENT_DOCUMENTS',
);

export const removeDocuments = createAction<number>('REMOVE_ATTACHMENT_DOCUMENTS');

const initialState: EntityAttachmentDocument[] = [];

export const attachmentDocuments = createReducer(initialState, builder =>
  builder
    .addCase(setDocuments, (_, action) => action.payload)
    .addCase(addDocuments, (state, action) => [...state, action.payload])
    .addCase(updateDocuments, (state, action) => {
      const index = state.findIndex(aai => aai.id === action.payload.id);

      state[index] = action.payload;

      return state;
    })
    .addCase(removeDocuments, (state, action) => {
      const newState: EntityAttachmentDocument[] = [];

      state.forEach(aai => aai.id !== action.payload && newState.push(aai));

      return newState;
    }),
);
