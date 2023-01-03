import {StandardEntry} from '../../StandardEntry';

export interface UnitType extends StandardEntry {}

export const newUnitType = (): UnitType => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});