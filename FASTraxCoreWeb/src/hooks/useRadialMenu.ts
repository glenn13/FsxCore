import React from 'react';
import {useDispatch} from 'react-redux';
import {RadialItem} from './../store/app/types';
import {setRadialItems} from '../store/app/types';

export interface RadialMenuProps {
  rerenderDelayMS?: number;
}

export const useRadialMenu = ({rerenderDelayMS}: RadialMenuProps = {}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(setRadialItems([]));
    };
  }, [dispatch]);

  const generate = React.useCallback(
    (radialItems: RadialItem[]) => {
      if (!rerenderDelayMS) return dispatch(setRadialItems(radialItems));

      setTimeout(() => {
        return dispatch(setRadialItems(radialItems));
      }, rerenderDelayMS);
    },
    [dispatch, rerenderDelayMS],
  );

  return React.useMemo(
    () => ({
      generate,
    }),
    [generate],
  );
};
