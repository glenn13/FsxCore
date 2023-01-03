import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { StockVersion } from '@app/entities/stock/standard-entries/StockVersion';

export const KEY = generateUUID();

export const getStockVersions = async (): Promise<AxiosResponse<StockVersion[]>> => {
    return await http.get(FsxUri.stock.SE.stockVersion.all);
};

export const useStockVersions = () => {
    const result = useQuery(KEY, getStockVersions);

    return result;
};
