import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { StockCondition } from '@app/entities/stock/standard-entries/StockCondition';

export const KEY = generateUUID();

export const getStockConditions = async (): Promise<AxiosResponse<StockCondition[]>> => {
    return await http.get(FsxUri.stock.SE.stockCondition.all);
};

export const useStockConditions = () => {
    const result = useQuery(KEY, getStockConditions);

    return result;
};
