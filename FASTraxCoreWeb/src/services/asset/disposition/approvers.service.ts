import http from '@app/services/http.service';
import {FsxUri} from './../../../helpers/endpoints';
import Group from '@app/entities/hr/standard-entries/Group';
import GroupUser from '@app/entities/hr/standard-entries/GroupUser';

export const getApprovers = () => {
  return http.get<Group>(FsxUri.assets.dispositions.approvers.base);
};

export const postApprover = (userId: number) => {
  return http.post<GroupUser>(FsxUri.assets.dispositions.approvers.add(userId));
};
