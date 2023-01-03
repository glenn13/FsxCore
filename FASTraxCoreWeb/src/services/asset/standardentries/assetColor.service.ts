import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';

export const ASSET_COLORS_KEY = 'ASSET_COLORS';

export const getAssetColors = async (): Promise<AxiosResponse<AssetColor[]>> => {
  return await http.get(FsxUri.assets.SE.assetColor.all);
};

export const useAssetColors = () => {
    const result = useQuery(ASSET_COLORS_KEY, getAssetColors);

  return result;
};
