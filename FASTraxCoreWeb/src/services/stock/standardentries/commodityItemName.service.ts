import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { CommodityItemName } from '@app/entities/stock/standard-entries/CommodityItemName';

export const KEY = generateUUID();

export const getCommodityItemNames = async (): Promise<AxiosResponse<CommodityItemName[]>> => {
    return await http.get(FsxUri.stock.SE.commodityItemName.all);
};

export const useCommodityItemNames = () => {
    const result = useQuery(KEY, getCommodityItemNames);

    return result;
};
