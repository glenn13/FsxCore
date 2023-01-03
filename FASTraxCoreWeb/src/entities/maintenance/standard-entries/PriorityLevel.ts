import {StandardEntry} from './../../StandardEntry';

export interface PriorityLevel extends StandardEntry {}

export const newPriorityLevel = (): PriorityLevel => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});

export {PriorityLevel as default};
