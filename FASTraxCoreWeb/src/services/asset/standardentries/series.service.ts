import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';

export const ASSET_SERIES_KEY = 'ASSET_SERIES';

export const getSeries = async (): Promise<AxiosResponse<AssetSeries[]>> => {
  return await http.get(FsxUri.assets.SE.assetSeries.all);
};

export const useSeries = () => {
  const result = useQuery(ASSET_SERIES_KEY, getSeries);

  return result;
};
