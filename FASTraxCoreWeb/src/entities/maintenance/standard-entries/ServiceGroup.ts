import {BaseEntity} from '../../base';

export interface ServiceGroup extends BaseEntity {
  description: string;
}

export const newServiceGroup = (): ServiceGroup => ({
  id: 0,
  description: '',
});

export {ServiceGroup as default};
