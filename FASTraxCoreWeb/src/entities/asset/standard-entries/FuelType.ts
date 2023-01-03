import {StandardEntry} from '../../StandardEntry';

export interface FuelType extends StandardEntry {}

export const newFuelType = (): FuelType => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});
