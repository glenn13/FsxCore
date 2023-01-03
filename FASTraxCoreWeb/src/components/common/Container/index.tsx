import React from 'react';
import clx from 'classnames';
import {
  FlexProperties,
  generateClasses,
  SizeProperties,
  SpacingProperties,
  TextProperties,
} from './types';

export interface ContainerProps
  extends FlexProperties,
    SizeProperties,
    TextProperties,
    SpacingProperties {}

const Container: React.FC<ContainerProps> = props => {
  const {children, className} = props;

  return <div className={clx('flex', className, generateClasses(props))}>{children}</div>;
};

export default Container;
