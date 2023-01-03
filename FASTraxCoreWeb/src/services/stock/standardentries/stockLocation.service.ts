import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { StockLocation } from '@app/entities/stock/standard-entries/StockLocation';

export const KEY = generateUUID();

export const getStockLocations = async (): Promise<AxiosResponse<StockLocation[]>> => {
    return await http.get(FsxUri.stock.SE.stockLocation.all);
};

export const useStockLocations = () => {
    const result = useQuery(KEY, getStockLocations);

    return result;
};
