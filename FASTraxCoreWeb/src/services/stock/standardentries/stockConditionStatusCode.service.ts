import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { StockConditionStatusCode } from '@app/entities/stock/standard-entries/StockConditionStatusCode';

export const KEY = generateUUID();

export const getStockConditionStatusCodes = async (): Promise<AxiosResponse<StockConditionStatusCode[]>> => {
    return await http.get(FsxUri.stock.SE.stockConditionStatusCode.all);
};

export const useStockConditionStatusCodes = () => {
    const result = useQuery(KEY, getStockConditionStatusCodes);

    return result;
};
