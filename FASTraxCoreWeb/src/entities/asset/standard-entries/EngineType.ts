import {StandardEntry} from '../../StandardEntry';

export interface EngineType extends StandardEntry {}

export const newEngineType = (): EngineType => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});
