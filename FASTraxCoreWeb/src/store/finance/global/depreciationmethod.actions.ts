import { AxiosResponse } from 'axios';
import { ReduxThunk } from '../../rootReducer';
import depreciationMethodService from '@app/services/finance/global/depreciationmethod.service';

export const submitStraightLinePayload = (payload: StraightLineVariable): ReduxThunk<Promise<AxiosResponse<StraightLineDetail[]>>> => async (_, getState) => {
    return postStraightLinePayload(payload);
}

export const postStraightLinePayload = async(payload: StraightLineVariable) : Promise<AxiosResponse<StraightLineDetail[]>> => {
    return depreciationMethodService.postStraightLine(payload);
};