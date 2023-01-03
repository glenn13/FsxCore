import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';

export const ASSET_MANUFACTURERS_KEY = 'ASSET_MANUFACTURERS';

export const getAssetManufacturers = async (): Promise<AxiosResponse<AssetManufacturer[]>> => {
  return await http.get(FsxUri.assets.SE.assetManufacturer.all);
};

export const useAssetManufacturers = () => {
  const result = useQuery(ASSET_MANUFACTURERS_KEY, getAssetManufacturers);

  return result;
};
