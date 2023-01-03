import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';

export const ASSET_ITEM_NAMES_KEY = 'ASSET_ITEM_NAMES';

export const getAssetItemNames = async (): Promise<AxiosResponse<AssetItemName[]>> => {
  return http.get(FsxUri.assets.SE.assetItemName.all);
};

export const useAssetItemNames = () => {
    const result = useQuery(ASSET_ITEM_NAMES_KEY, getAssetItemNames);

  return result;
};
