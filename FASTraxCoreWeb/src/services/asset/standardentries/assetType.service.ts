import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';

export const ASSET_TYPES_KEY = 'ASSET_TYPES';

export const getAssetTypes = async (): Promise<AxiosResponse<AssetType[]>> => {
  return await http.get(FsxUri.assets.SE.assetType.all);
};

export const useAssetTypes = () => useQuery(ASSET_TYPES_KEY, getAssetTypes);
