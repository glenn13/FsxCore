import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { CommodityModel } from '@app/entities/stock/standard-entries/CommodityModel';

export const KEY = generateUUID();

export const getCommodityModels = async (): Promise<AxiosResponse<CommodityModel[]>> => {
    return await http.get(FsxUri.stock.SE.commodityModel.all);
};

export const useCommodityModels = () => {
    const result = useQuery(KEY, getCommodityModels);

    return result;
};
