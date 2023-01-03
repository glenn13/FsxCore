import {createReducer, createAction} from '@reduxjs/toolkit';
import {EntityAttachmentImage} from '@app/entities/global/EntityAttachmentImage';

export const setImages = createAction<EntityAttachmentImage[]>('SET_ATTACHMENT_IMAGES');

export const addImages = createAction<EntityAttachmentImage>('ADD_ATTACHMENT_IMAGES');

export const updateImages = createAction<EntityAttachmentImage>('UPDATE_ATTACHMENT_IMAGES');

export const removeImages = createAction<number>('REMOVE_ATTACHMENT_IMAGES');

const initialState: EntityAttachmentImage[] = [];

export const attachmentImages = createReducer(initialState, builder =>
  builder
    .addCase(setImages, (_, action) => action.payload)
    .addCase(addImages, (state, action) => {
      if (!action.payload.default) return [...state, action.payload];

      const result: EntityAttachmentImage[] = [];

      state.forEach(image => result.push({...image, default: false}));

      result.push(action.payload);

      return result;
    })
    .addCase(updateImages, (state, action) => {
      const index = state.findIndex(aai => aai.id === action.payload.id);

      if (index === -1) return state;

      if (action.payload.default) for (const data of state) data.default = false;

      state[index] = action.payload;

      return state;
    })
    .addCase(removeImages, (state, action) => state.filter(aai => aai.id !== action.payload)),
);
