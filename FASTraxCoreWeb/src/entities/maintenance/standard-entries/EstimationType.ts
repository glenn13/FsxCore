import {StandardEntry} from './../../StandardEntry';

export interface EstimationType extends StandardEntry {}

export const newEstimationType = (): EstimationType => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});

export {EstimationType as default};
