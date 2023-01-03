
import { useQuery } from 'react-query';

import { FsxUri } from './../../helpers/endpoints';
import http from '../http.service';
import httpService from '../http.service';

import EstimateSummary from '@app/entities/maintenance/estimate/EstimateSummary';
import EstimateComponent from '@app/entities/maintenance/estimate/EstimateComponent';
import EstimateGeneralAsset from '@app/entities/maintenance/estimate/EstimateGeneralAsset';
import EstimateVehicle from '@app/entities/maintenance/estimate/EstimateVehicle';
import { AssetCategoryEnum } from '@app/helpers/asset/enum';

const ESTIMATE_KEY = 'ESTIMATE_SUMMARY';

export const GetURIEstimatePageForView = (assetCategoryId: number, id: number): string => 
{
  let _value: string;
  _value = '';
  switch (assetCategoryId) {
    case Number(AssetCategoryEnum.GeneralAsset): {
      _value = `/app/maintenance/estimate/${id}/generalasset`;
      break;
    }
    case Number(AssetCategoryEnum.Vehicle): {
      _value = `/app/maintenance/estimate/${id}/vehicle`;
      break;
    }
    case Number(AssetCategoryEnum.Component): {
      _value = `/app/maintenance/estimate/${id}/component`;
      break;
    }
  }

  return _value;
};

export const deleteEstimateComponent = (id: number) =>
    httpService.delete<EstimateComponent>(FsxUri.maintenance.estimatecomponent.delete(id));

export const deleteEstimateGeneralAsset = (id: number) =>
    httpService.delete<EstimateGeneralAsset>(FsxUri.maintenance.estimategeneralasset.delete(id));

export const deleteEstimateVehicle = (id: number) =>
    httpService.delete<EstimateVehicle>(FsxUri.maintenance.estimatevehicle.delete(id));

export const getEstimateSummaryForGrid = () =>
    http.get<EstimateSummary[]>(FsxUri.maintenance.estimate.summaryForGrid());

export const useEstimateSummaryForGrid = () =>
    useQuery(ESTIMATE_KEY,getEstimateSummaryForGrid);


