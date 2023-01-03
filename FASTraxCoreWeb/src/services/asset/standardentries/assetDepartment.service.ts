import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

export const ASSET_DEPARTMENTS_KEY = 'ASSET_DEPARTMENTS';

export const getAssetDepartments = async (): Promise<AxiosResponse<AssetDepartment[]>> => {
    return await http.get(FsxUri.assets.SE.assetDepartment.all);
};

export const useAssetDepartments = () => {
    const result = useQuery(ASSET_DEPARTMENTS_KEY, getAssetDepartments);
    return result;
};
