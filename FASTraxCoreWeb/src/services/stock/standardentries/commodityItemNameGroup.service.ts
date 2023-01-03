import { CommodityItemNameGroup } from '@app/entities/stock/standard-entries/CommodityItemNameGroup';
import { FsxUri } from '@app/helpers/endpoints';
import { generateUUID } from '@app/helpers/randoms';
import http from '@app/services/http.service';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

export const KEY = generateUUID();

export const getCommodityItemNameGroups = async (): Promise<AxiosResponse<CommodityItemNameGroup[]>> => {
    return await http.get(FsxUri.stock.SE.commodityItemNameGroup.all);
};

export const useCommodityItemNameGroups = () => {
    const result = useQuery(KEY, getCommodityItemNameGroups);

    return result;
};