import {createReducer, createAction} from '@reduxjs/toolkit';
import EntityLinkedAsset from '@app/entities/asset/inventory/EntityLinkedAsset';

export const setLinkedAssets = createAction<EntityLinkedAsset<unknown>[]>('SET_LINKED_ASSETS');

export const linkedAssets = createReducer<EntityLinkedAsset<unknown>[]>([], builder =>
  builder.addCase(setLinkedAssets, (_, action) => [...action.payload]),
);
