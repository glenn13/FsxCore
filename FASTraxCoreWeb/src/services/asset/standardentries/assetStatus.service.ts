import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';
export const ASSET_STATUS_KEY = 'ASSET_STATUS';

export const getAssetStatus = () => {
  return http.get<AssetStatus[]>(FsxUri.assets.SE.assetStatus.all);
};

export const getDefaultAssetStatus = () => {
  return http.get<AssetStatus>(FsxUri.assets.SE.assetStatus.default());
};

export const useAssetStatus = () => {
    const result = useQuery(ASSET_STATUS_KEY, getAssetStatus);

  return result;
};
