import React, {HTMLAttributes, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Waves, {ElementSelector} from 'node-waves';
import invert from 'invert-color';
import {ReactComponent as LoadingSvg} from '@app/assets/images/loading.svg';
import defaultTheme from '@app/theme/presets/base';
const color = require('color');
const clx = require('classnames');

type ColorsType = typeof defaultTheme.color;

interface IButtonProps {
  rounded?: boolean;
  shadow?: boolean;
  circle?: boolean;
  ripple?: boolean;
  block?: boolean;
  oval?: boolean;
  transparent?: boolean;
  reverse?: boolean;
  loading?: boolean;
  colorType?: keyof ColorsType;
  small?: boolean;
}

const ButtonLayout = styled.button<IButtonProps>`
  --btn-color: ${props => color(props.theme.color.secondary)};

  position: relative;
  outline: none;
  padding: ${props => (!!!props.small ? '0.85em 1.5em 0.85em' : '0.65em 1em 0.65em')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  text-align: center;
  font-weight: normal;
  border: none;
  background: ${props =>
    props.transparent
      ? 'transparent'
      : props.colorType !== undefined
      ? color(props.theme.color[props.colorType])
      : props.theme.color.secondary};
  color: ${props => invert(props.theme.color.primary)};
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:not(:disabled) {
    ${props =>
      props.shadow &&
      `box-shadow: 0 8px 15px -9px ${color(props.theme.color.secondary).lighten(0.5)};`}
  }

  &:not(:disabled):hover {
    ${props =>
      props.shadow &&
      `box-shadow: 0 8px 21px -7px ${color(props.theme.color.secondary).lighten(0.1)};`}
  }
  & > i {
    color: ${props => invert(props.theme.color.primary)};
  }
  &:disabled {
    cursor: default;
    // background: #f7f7f7;
    color: #cecece;
    opacity: 0.5;
  }
  &:focus {
    outline: 0;
  }

  &.reverse {
    flex-direction: row-reverse;
  }
`;

const Button = React.forwardRef<
  HTMLButtonElement | null,
  IButtonProps & HTMLAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({className, loading, ...props}, ref) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (ref && typeof ref === 'function') {
    } else if (ref) {
      ref.current = btnRef.current;
    }

    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    if (props.ripple) {
      Waves.attach(btnRef.current as ElementSelector, ['waves-light']);
      Waves.init();
    }
  }, [props.ripple]);

  return (
    <ButtonLayout
      ref={btnRef}
      {...props}
      disabled={loading || props.disabled}
      className={`${className} ${clx({
        'btn-rounded': props.rounded,
        'btn-circle': props.circle,
        'btn-block': props.block,
        'btn-oval': props.oval,
        reverse: props.reverse,
      })}`}
    >
      {loading ? <LoadingSvg height="22" width={22} className="rotating" /> : props.children}
    </ButtonLayout>
  );
});

export {Button as default, IButtonProps};
