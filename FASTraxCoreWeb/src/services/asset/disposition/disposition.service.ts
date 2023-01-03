import { AssetCategoryEnum } from '@app/helpers/asset/enum';
import FsxUri from '@app/helpers/endpoints';
import httpService from '@app/services/http.service';
import {useQuery} from 'react-query';

export const DISPOSTION_SUMMARY_KEY = 'DISPOSITION_SUMMARY';


export const GetURIDispositionPageForView = (assetCategoryId: number, id: number): string => 
{
  let _value: string;
  _value = '';
  switch (assetCategoryId) {
    case Number(AssetCategoryEnum.GeneralAsset): {
      _value = `/app/asset/disposition/generalasset/${id}`;
      break;
    }
    case Number(AssetCategoryEnum.Vehicle): {
      _value = `/app/asset/disposition/vehicle/${id}`;
      break;
    }
    case Number(AssetCategoryEnum.Component): {
      _value = `/app/asset/disposition/component/${id}`;
      break;
    }
  }

  return _value;
};

export const getDispositionPerRecord = (searchKey?: string) =>
  httpService.get<DispositionSummary[]>(
    `${FsxUri.assets.dispositions.perRecord.base}?searchkey=${searchKey}`,
  );

export const getDispositionSummary = () =>
  httpService.get<DispositionSummary[]>(`${FsxUri.assets.dispositions.summary.base}`);

export const getDispositionCount= () =>
  httpService.get<any>(FsxUri.assets.dispositions.dispositionCount());

export const useDispositionSummary = () => useQuery(DISPOSTION_SUMMARY_KEY, getDispositionSummary);

