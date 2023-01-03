import FsxUri from '@app/helpers/endpoints';
import httpService from '../http.service';
import {useQuery} from 'react-query';
import { AssetCategoryEnum } from '@app/helpers/asset/enum';

export const GetURIInspectionPageForView = (assetCategoryId: number, id: number): string => 
{
  let _value: string;
  _value = '';
  switch (assetCategoryId) {
    case Number(AssetCategoryEnum.GeneralAsset): {
      _value = `/app/maintenance/inspection/generalassets/${id}`;
      break;
    }
    case Number(AssetCategoryEnum.Vehicle): {
      _value = `/app/maintenance/inspection/vehicles/${id}`;
      break;
    }
    case Number(AssetCategoryEnum.Component): {
      _value = `/app/maintenance/inspection/components/${id}`;
      break;
    }
  }

  return _value;
};

export const getInspectionSummary = () =>
  httpService.get<InspectionSummary[]>(FsxUri.maintenance.inspection.summary());

export const useInspectionSummary = () => useQuery('inspectionSummary', getInspectionSummary);

export const deleteInspectionComponent = (id: number) =>
    httpService.delete<InspectionComponent>(FsxUri.maintenance.inspectionComponent.delete(id));

export const deleteInspectionGeneralAsset = (id: number) =>
    httpService.delete<InspectionGeneralAsset>(FsxUri.maintenance.inspectionGeneralAsset.delete(id));

export const deleteInspectionVehicle = (id: number) =>
    httpService.delete<InspectionVehicle>(FsxUri.maintenance.inspectionVehicle.delete(id));

export const getInspectionCount= () =>
httpService.get<any>(FsxUri.maintenance.inspection.inspectionCount());

