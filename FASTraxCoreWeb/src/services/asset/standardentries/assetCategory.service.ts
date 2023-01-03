import {useQuery} from 'react-query';
import {AxiosResponse} from 'axios';
import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';

export const ASSET_CATEGORIES_KEY = 'ASSET_CATEGORIES';

export const getAssetCategories = async (): Promise<AxiosResponse<AssetCategory[]>> => {
    return http.get(uri.assets.SE.assetCategory.all);
};

export const useAssetCategories = () => {
  const result = useQuery(ASSET_CATEGORIES_KEY, getAssetCategories);

  return result;
};
