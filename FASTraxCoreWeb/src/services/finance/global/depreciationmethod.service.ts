import {AxiosResponse} from 'axios';
import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';

export const postStraightLine = (payload: StraightLineVariable): Promise<AxiosResponse<StraightLineDetail[]>> => {
    return http.post<StraightLineDetail[]>(uri.finance.depreciationMethod.straightLine.base, payload);
};

export const CalculateDepreciationValue = (purchaseCost: number, residualCost: number, usefulLife: number) => {
    let value = ((purchaseCost - residualCost) / usefulLife);
    value = value < 0 ? 0 : value;
    value = isFinite(value) ? value : 0;
    return value;
};

export const CalculateDepreciationRate = (depreciationValue: number, purchaseCost: number) => {
    let value =  ((depreciationValue / purchaseCost) * 100);
    value = value < 0 ? 0 : value;
    value = isFinite(value) ? value : 0;
    return value;
};


export default {
    postStraightLine,
    CalculateDepreciationValue,
    CalculateDepreciationRate
}