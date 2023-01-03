import {BaseEntity} from '../../base';

export interface ServiceType extends BaseEntity {
  description: string;
}

export const newServiceType = (): ServiceType => ({
  id: 0,
  description: '',
});

export {ServiceType as default};
