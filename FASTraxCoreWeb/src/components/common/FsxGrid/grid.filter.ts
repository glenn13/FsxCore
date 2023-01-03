import {find} from 'lodash';
import moment from 'moment';

export const getOperator = (str: string) => {
  switch (str) {
    case 'neq':
    case 'neq_date':
      return 'is not equal to';
    case 'eq':
    case 'eq_date':
      return 'is equal to';
    case 'doesnotcontain':
      return 'does not contain';
    case 'startswith':
      return 'starts with';
    case 'endswith':
      return 'ends with';
    case 'lt':
      return 'less than';
    case 'lte':
      return 'less than or equal to';
    case 'gt':
      return 'greater than';
    case 'gte':
      return 'greater than or equal to';
    case 'lt_date':
      return 'before';
    case 'lte_date':
      return 'before or equal to';
    case 'gt_date':
      return 'after than';
    case 'gte_date':
      return 'after or equal to';
    default:
      return 'contains';
  }
};

export type gridFilterType = {
  field: string;
  text: string;
  operator: string;
  value: string | number;
};

interface kFilterProps extends gridFilterType {
  filters: Array<kFilterProps>;
}

export const recurFilterStr = (
  obj: Array<kFilterProps>,
  gridColObj: any,
  filter: Array<any> = [],
): Array<gridFilterType> => {
  for (let i = 0, count = obj.length; i < count; i++) {
    if (obj[i] && obj[i].filters) {
      filter.push(...recurFilterStr(obj[i].filters, gridColObj));
    } else {
      let query = find(gridColObj, {field: obj[i].field});
      if (query) {
        let _value: string | number;
        let _operator = '';

        if (query.filter === 'date') {
          _value = moment(obj[i].value).format('D-MMM-YYYY');
          _operator = getOperator(obj[i].operator);
        } else {
          _value = obj[i].value;
          _operator = getOperator(obj[i].operator);
        }

        if (query.filter === 'numeric' || query.filter === 'boolean')
          filter.push({field: query.field, text: query.title, operator: _operator, value: _value});
        else
          filter.push({field: query.field, text: query.title, operator: _operator, value: _value});
      }
    }
  }

  return filter;
};
