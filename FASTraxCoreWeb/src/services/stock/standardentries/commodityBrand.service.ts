import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { CommodityBrand } from '@app/entities/stock/standard-entries/CommodityBrand';

export const KEY = generateUUID();

export const getCommodityBrands = async (): Promise<AxiosResponse<CommodityBrand[]>> => {
    return await http.get(FsxUri.stock.SE.commodityBrand.all);
};

export const useCommodityBrands = () => {
    const result = useQuery(KEY, getCommodityBrands);

    return result;
};
