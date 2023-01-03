import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { StockLocationShelf } from '@app/entities/stock/standard-entries/StockLocationShelf';

export const KEY = generateUUID();

export const getStockLocationShelfs = async (): Promise<AxiosResponse<StockLocationShelf[]>> => {
    return await http.get(FsxUri.stock.SE.stockLocationShelf.all);
};

export const useStockLocationShelfs = () => {
    const result = useQuery(KEY, getStockLocationShelfs);

    return result;
};
