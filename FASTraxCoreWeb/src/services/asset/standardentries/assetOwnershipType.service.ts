import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';
export const ASSET_OWNERSHIP_TYPES_KEY = 'ASSET_OWNERSHIP_TYPES';

export const getAssetOwnershipTypes = async (): Promise<AxiosResponse<AssetOwnershipType[]>> => {
  return await http.get(FsxUri.assets.SE.assetOwnershipType.all);
};

export const useAssetOwnershipTypes = () => {
    const result = useQuery(ASSET_OWNERSHIP_TYPES_KEY, getAssetOwnershipTypes);

  return result;
};
