import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { StockDepartment } from '@app/entities/stock/standard-entries/StockDepartment';

export const KEY = generateUUID();

export const getStockDepartments = async (): Promise<AxiosResponse<StockDepartment[]>> => {
    return await http.get(FsxUri.stock.SE.stockDepartment.all);
};

export const useStockDepartments = () => {
    const result = useQuery(KEY, getStockDepartments);

    return result;
};
