import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/rootReducer';
import RadialMenu from '../common/RadialMenu';

export interface RadialOptionsProps {}

// this component was separated so re-rendering of store update will be micro
const RadialOptions: React.FC<RadialOptionsProps> = () => {
  const radialItems = useSelector((state: RootState) => state.app.radialMenu);

  return <RadialMenu radialItems={radialItems} position="bottom-right" />;
};

export default RadialOptions;
