import {AssetState} from '@app/entities/asset/standard-entries/AssetState';
import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';

export const ASSET_STATES_KEY = 'ASSET_STATES';

export const getAssetStates = async (): Promise<AxiosResponse<AssetState[]>> => {
  return await http.get(FsxUri.assets.SE.assetState.all);
};

export const useAssetSates = () => {
  const result = useQuery(ASSET_STATES_KEY, getAssetStates);

  return result;
};
