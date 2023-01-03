import React from 'react';
import defaultTheme from '@app/theme/presets/base';
import styled from 'styled-components';

const color = require('color');

export type ColorsType = typeof defaultTheme.color;

interface BadgeProps {
  label: string;
  type?: keyof ColorsType;
  size?: number;
  rounded?: boolean;
  className?: string;
}

const BadgeStyled = styled.span<{type?: keyof ColorsType; size: number; rounded: boolean}>`
  background: ${props =>
    props.type && color(props.theme.color[props.type]).fade(0.8).saturate(0.4)};
  color: ${props => props.type && color(props.theme.color[props.type]).darken(0.1)};
  padding: 3px 9px;
  display: inline-block;
  border-radius: ${props => `${props.rounded ? '9999px' : '4px'}!important`};
  font-size: ${props => `${props.size}px`};
`;
export const Badge: React.FC<BadgeProps> = ({size = 13, rounded = false, className, ...props}) => {
  return (
    <BadgeStyled type={props.type} size={size} rounded={rounded} className={className}>
      {props.label}
    </BadgeStyled>
  );
};

export default Badge;
