import {ProjectSite} from '@app/entities/catalog';
import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';

/******** API REQUEST ********/

export const getProjectSitesByProjectId = async (projectId: UrlParam) => {
  return http.get<ProjectSite[]>(uri.catalog.projectSites.findByProjectId(projectId));
};

export const getAllProjectSites = async () => {
  return http.get<ProjectSite[]>(uri.catalog.projectSites.base);
};

export const getAllProjectSitesByCustomer = async (customerId: number | null) => {
  return http.get<ProjectSite[]>(uri.catalog.projectSites.findByCustomerId(customerId));
};
