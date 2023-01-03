import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { CommodityDepartment } from '@app/entities/stock/standard-entries/CommodityDepartment';

export const KEY = generateUUID();

export const getCommodityDepartments = async (): Promise<AxiosResponse<CommodityDepartment[]>> => {
    return await http.get(FsxUri.stock.SE.commodityDepartment.all);
};

export const useCommodityDepartments = () => {
    const result = useQuery(KEY, getCommodityDepartments);

    return result;
};
