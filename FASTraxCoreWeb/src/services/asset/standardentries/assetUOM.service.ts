import {AssetUOM} from '@app/entities/asset/standard-entries/AssetUOM';
import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';
export const ASSET_UOM_KEY = 'ASSET_UOM';

export const getAssetUOM = async (): Promise<AxiosResponse<AssetUOM[]>> => {
  return await http.get(FsxUri.assets.SE.assetUOM.all);
};

export const useAssetUOM = () => {
    const result = useQuery(ASSET_UOM_KEY, getAssetUOM);

  return result;
};
