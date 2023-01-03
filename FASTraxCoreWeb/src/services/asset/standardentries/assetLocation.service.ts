import {AssetLocation} from '@app/entities/asset/standard-entries/AssetLocation';
import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';

export const ASSET_LOCATIONS_KEY = 'ASSET_LOCATIONS';

export const getAssetLocations = async (): Promise<AxiosResponse<AssetLocation[]>> => {
  return await http.get(FsxUri.assets.SE.assetLocation.all);
};

export const useAssetLocations = () => {
  const result = useQuery(ASSET_LOCATIONS_KEY, getAssetLocations);

  return result;
};
