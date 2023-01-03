import React from 'react';
import moment from 'moment';
import _ from 'lodash';

interface IGrid {
     field: string;
     filters: [];
     operator: string;
     value: string;
}

interface IGridColumn {
     field: string;
     column: string;
     value: string;
}

const getOperator = (str: string, isdate: boolean = false) => {
     if (isdate == true) str += '_date';

     var _operator = '';
     switch (str) {
          case 'neq':
          case 'neq_date':
               _operator = 'is not equal to';
               break;
          case 'eq':
          case 'eq_date':
               _operator = 'is equal to';
               break;
          case 'doesnotcontain':
               _operator = 'does not contain';
               break;
          case 'startswith':
               _operator = 'starts with';
               break;
          case 'endswith':
               _operator = 'ends with';
               break;
          case 'lt':
               _operator = 'less than';
               break;
          case 'lte':
               _operator = 'less than or equal to';
               break;
          case 'gt':
               _operator = 'greater than';
               break;
          case 'gte':
               _operator = 'greater than or equal to';
               break;
          case 'lt_date':
               _operator = 'before';
               break;
          case 'lte_date':
               _operator = 'before or equal to';
               break;
          case 'gt_date':
               _operator = 'after than';
               break;
          case 'gte_date':
               _operator = 'after or equal to';
               break;
          default:
               _operator = 'contains';
               break;
     }

     return _operator;
};

const isValidDate = (strDate: string) => {
     var formats = [
          'MM-DD-YYYY',
          'YYYY-MM-DD',
          'DD-MMM-YYYY',
          'MMMM DD YYYY',
          'DD MMMM YYYY',
          'DD MMM YYYY'
     ];

     if (typeof strDate == 'string') {
          strDate = strDate
               .replace(/,/g, '')
               .replace(/\s{2,}/g, ' ')
               .trim();

          if (moment(strDate, formats, true).isValid()) return true;
          else return false;
     } else {
          return moment(moment(strDate), formats, true).isValid();
     }

     return false;
};

const recurFilterString = (obj: any, gridColObj: any) => {
     var filtstr = '';

     return filtstr;
};

export { recurFilterString };
