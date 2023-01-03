import Group from '@app/entities/hr/standard-entries/Group';

export const userIsInGroup = (userId: number, group: Group) =>
  group.groupUsers?.map(gu => gu.userId).indexOf(userId) !== -1;
