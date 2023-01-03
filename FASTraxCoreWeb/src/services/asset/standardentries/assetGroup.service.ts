import {AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import http from '@app/services/http.service';
import {FsxUri} from '@app/helpers/endpoints';

export const ASSET_GROUPS_KEY = 'ASSET_GROUPS';

export const getAssetGroups = async (): Promise<AxiosResponse<AssetGroup[]>> => {
    return await http.get(FsxUri.assets.SE.assetGroup.all);
};

export const useAssetGroups = () => useQuery(ASSET_GROUPS_KEY, getAssetGroups);
