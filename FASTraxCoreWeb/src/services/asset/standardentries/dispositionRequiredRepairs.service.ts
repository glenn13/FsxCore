import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { DispositionRequiredRepair } from '@app/entities/asset/standard-entries/DispositionRequiredRepair';

export const KEY = generateUUID();

export const getDispositionRequiredRepairs = async (): Promise<AxiosResponse<DispositionRequiredRepair[]>> => {
    return await http.get(FsxUri.assets.SE.dispositionRequiredRepair.all);
};

export const useDispositionRequiredRepairs = () => {
    const result = useQuery(KEY, getDispositionRequiredRepairs);

    return result;
};
