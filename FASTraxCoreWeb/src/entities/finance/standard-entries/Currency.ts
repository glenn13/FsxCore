import {StandardEntry} from './../../StandardEntry';

export interface Currency extends StandardEntry {}

export const newCurrency = (): Currency => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});

export {Currency as default};
