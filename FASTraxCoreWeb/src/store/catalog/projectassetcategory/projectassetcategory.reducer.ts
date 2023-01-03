import {createReducer, createAction} from '@reduxjs/toolkit';
import {ProjectAssetCategory} from '@app/entities/catalog/ProjectAssetCategory';

export const setProjectAssetCategory = createAction<ProjectAssetCategory[]>(
  'SET_PROJECT_ASSET_CATEGORY',
);

export interface ProjectAssetCategories {
  all?: ProjectAssetCategory[];
  current?: ProjectAssetCategory[];
}

const initialState: ProjectAssetCategories = {
  all: [],
  current: [],
};

export const projectAssetCategoryReducer = createReducer(initialState, builder =>
  builder.addCase(setProjectAssetCategory, (state, action) => {
    state.current = action.payload;
  }),
);
