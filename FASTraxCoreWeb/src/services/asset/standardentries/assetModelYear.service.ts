import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';

export const ASSET_MODEL_YEARS_KEY = 'ASSET_MODEL_YEARS';

export const getAssetModelYears = async (): Promise<AxiosResponse<AssetModelYear[]>> => {
  return await http.get(FsxUri.assets.SE.assetModelYear.all);
};

export const useAssetModelYears = () => {
    const result = useQuery(ASSET_MODEL_YEARS_KEY, getAssetModelYears);

  return result;
};
