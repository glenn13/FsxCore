import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { StockConditionDispositionCode } from '@app/entities/stock/standard-entries/StockConditionDispositionCode';

export const KEY = generateUUID();

export const getStockConditionDispositionCodes = async (): Promise<AxiosResponse<StockConditionDispositionCode[]>> => {
    return await http.get(FsxUri.stock.SE.stockConditionDispositionCode.all);
};

export const useStockConditionDispositionCodes = () => {
    const result = useQuery(KEY, getStockConditionDispositionCodes);

    return result;
};
