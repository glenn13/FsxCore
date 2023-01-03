import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { UnitType } from '@app/entities/stock/standard-entries/UnitType';

export const KEY = generateUUID();

export const getUnitTypes = async (): Promise<AxiosResponse<UnitType[]>> => {
    return await http.get(FsxUri.stock.SE.stockVersion.all);
};

export const useUnitTypes = () => {
    const result = useQuery(KEY, getUnitTypes);

    return result;
};
