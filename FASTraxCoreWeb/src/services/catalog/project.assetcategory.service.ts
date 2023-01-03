import {ProjectAssetCategory} from '@app/entities/catalog/ProjectAssetCategory';
import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';

/******** API REQUEST ********/

export const getProjectAssetCategoriesByProjectId = async (projectId: UrlParam) => {
  return http.get<ProjectAssetCategory[]>(
    uri.catalog.projects.assetCategories.findByProjectId(projectId),
  );
};
