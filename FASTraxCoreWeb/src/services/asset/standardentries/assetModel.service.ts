import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';

export const ASSET_MODELS_KEY = 'ASSET_MODELS';

export const getAssetModels = async (): Promise<AxiosResponse<AssetModel[]>> => {
  return await http.get(FsxUri.assets.SE.assetModel.all);
};

export const useAssetModels = () => {
    const result = useQuery(ASSET_MODELS_KEY, getAssetModels);

  return result;
};
