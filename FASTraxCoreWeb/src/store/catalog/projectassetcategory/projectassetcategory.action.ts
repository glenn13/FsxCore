import {ReduxThunk} from '@app/store/rootReducer';
import {UUIDToArray} from '@app/utils/uuid.util';
import {ProjectAssetCategory} from '@app/entities/catalog/ProjectAssetCategory';
import * as projectAssetCategoryService from '@app/services/catalog/project.assetcategory.service';
import {setProjectAssetCategory} from './projectassetcategory.reducer';

export const loadProjectAssetCategories = (projectId: UrlParam): ReduxThunk => async dispatch => {
  const {data} = await projectAssetCategoryService.getProjectAssetCategoriesByProjectId(projectId);

  dispatch(setProjectAssetCategory(UUIDToArray<ProjectAssetCategory>(data)));
};

export const clearProjectAssetCategories = (): ReduxThunk => async dispatch => {
  dispatch(setProjectAssetCategory([]));
};
