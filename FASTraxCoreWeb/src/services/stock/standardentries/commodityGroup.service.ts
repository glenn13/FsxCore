import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { CommodityGroup } from '@app/entities/stock/standard-entries/CommodityGroup';

export const KEY = generateUUID();

export const getCommodityGroups = async (): Promise<AxiosResponse<CommodityGroup[]>> => {
    return await http.get(FsxUri.stock.SE.commodityGroup.all);
};

export const useCommodityGroups = () => {
    const result = useQuery(KEY, getCommodityGroups);

    return result;
};
