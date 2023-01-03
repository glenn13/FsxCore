import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { StockSeries } from '@app/entities/stock/standard-entries/StockSeries';

export const KEY = generateUUID();

export const getStockSeries = async (): Promise<AxiosResponse<StockSeries[]>> => {
    return await http.get(FsxUri.stock.SE.stockSeries.all);
};

export const useStockSeries = () => {
    const result = useQuery(KEY, getStockSeries);

    return result;
};
