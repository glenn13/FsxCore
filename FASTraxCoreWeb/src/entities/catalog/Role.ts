import * as yup from 'yup';
import {StandardEntry} from '../StandardEntry';

export interface Role extends StandardEntry {}

export const roleShape = {
  code: yup.string().required('Code is required'),
  title: yup.string().required('Title is required'),
};
