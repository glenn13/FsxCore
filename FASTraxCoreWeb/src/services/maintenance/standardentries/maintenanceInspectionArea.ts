import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';
import {useQuery} from 'react-query';

/* -------------------------------------------------------------------------- */
/*                                    Axios                                   */
/* -------------------------------------------------------------------------- */

/**
 * get maintenance vehicle inspection area list
 */
export const getVehicleInspectionAreas = () =>
  http.get<InspectionArea[]>(uri.maintenance.SE.inspectionAreas.vehicle);

/**
 * get maintenance vehicle inspection area
 * @param id vehicle inspection area id
 */
export const getVehicleInspectionArea = (id: number) =>
  http.get<InspectionArea>(uri.maintenance.SE.inspectionAreas.findVehicle(id));

/**
 * get maintenance component inspection area list
 */
export const getComponentInspectionAreas = () =>
  http.get<InspectionArea[]>(uri.maintenance.SE.inspectionAreas.component);

/**
 * get maintenance component inspection area
 * @param id component inspection area id
 */
export const getComponentInspectionArea = (id: number) =>
  http.get<InspectionArea>(uri.maintenance.SE.inspectionAreas.findComponent(id));

/**
 * get maintenance general asset inspection area list
 */
export const getGeneralAssetInspectionAreas = () =>
  http.get<InspectionArea[]>(uri.maintenance.SE.inspectionAreas.generalAsset);

/**
 * get maintenance general asset inspection area
 * @param id general asset inspection area id
 */
export const getGeneralAssetInspectionArea = (id: number) =>
  http.get(uri.maintenance.SE.inspectionAreas.findGeneralAsset(id));

/* -------------------------------------------------------------------------- */
/*                                 React Query                                */
/* -------------------------------------------------------------------------- */

/**
 * useQuery instance of vehicle maintenance inspection area list
 */
export const useVehicleMaintenanceInspectionAreas = () =>
  useQuery('vehicleMaintenanceInspectionAreas', getVehicleInspectionAreas);
/**
 * useQuery instance of vehicle maintenance inspection area list
 */
export const useComponentMaintenanceInspectionAreas = () =>
  useQuery('componentMaintenanceInspectionAreas', getComponentInspectionAreas);
/**
 * useQuery instance of vehicle maintenance inspection area list
 */
export const useGeneralAssetMaintenanceInspectionAreas = () =>
  useQuery('generalAssetMaintenanceInspectionAreas', getGeneralAssetInspectionAreas);

// TODO: determine wether to create a useQuery for single fetch
// export const useMaintenanceVehicleInspectionArea = (id: number) =>
//   useQuery('maintenanceVehicleInspectionArea', getVehicleInspectionArea);
