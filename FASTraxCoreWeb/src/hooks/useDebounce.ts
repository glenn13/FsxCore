import {useCallback, useState} from 'react';

import _ from 'lodash';

export const useDebounce = (obj: any = null, callback: Function, wait: number = 1000) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState(obj);

  const setDebouncedState = (_val: any) => {
    debounce(_val);
  };

  const debounce = useCallback(
    _.debounce((_prop: string) => {
      callback(_prop);
      setState(_prop);
    }, wait),
    [],
  );

  return [setDebouncedState];
};
