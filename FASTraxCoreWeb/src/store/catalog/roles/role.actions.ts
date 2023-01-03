import {patchRole, postRole} from '@app/services/catalog/role.service';

import {ReduxThunk} from '@app/store/rootReducer';
import {Role} from '@app/entities/catalog/Role';
import {setStatus} from '@app/store/common/status.reducer';

export const submitRole = (data: Role): ReduxThunk => async (dispatch, getState) => {
  data.id && data.id > 0 ? patchRole(data) : postRole(data);

  dispatch(setStatus('Role successfully saved.'));
};
