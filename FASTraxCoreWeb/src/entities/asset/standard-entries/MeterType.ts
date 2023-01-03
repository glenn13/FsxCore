import {StandardEntry} from '../../StandardEntry';

export interface MeterType extends StandardEntry {}

export const newMeterType = (): MeterType => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});
