import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { CommoditySize } from '@app/entities/stock/standard-entries/CommoditySize';

export const KEY = generateUUID();

export const getCommoditySizes = async (): Promise<AxiosResponse<CommoditySize[]>> => {
    return await http.get(FsxUri.stock.SE.commoditySize.all);
};

export const useCommoditySizes = () => {
    const result = useQuery(KEY, getCommoditySizes);

    return result;
};
