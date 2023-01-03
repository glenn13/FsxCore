import {StandardEntry} from '../../StandardEntry';

export interface TransmissionType extends StandardEntry {}

export const newTransmissionType = (): TransmissionType => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});
