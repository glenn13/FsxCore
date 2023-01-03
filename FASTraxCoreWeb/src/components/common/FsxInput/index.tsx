import FsxInputWrapper, {FsxInputWrapperProps} from '../FsxInputWrapper';
import {InputProps, Input as KendoInput} from '@progress/kendo-react-inputs';

import React from 'react';
import clx from 'classnames';
import styled from 'styled-components';

export interface FsxExtraInputStyleProps {
  icon?: boolean;
  iconName?: string;
  iconColor?: string;
  iconPosition?: 'left' | 'right';
  oval?: boolean;
}

export type FsxInputProps = InputProps & FsxInputWrapperProps & FsxExtraInputStyleProps;

const IconStyled = styled.i<FsxExtraInputStyleProps>`
  position: absolute;
  ${props => props.iconPosition}: 12px;
  top: 14px;
  font-weight: 100;
  font-size: 16px;
  z-index: 1;
  color: ${props => (props.iconColor ? props.iconColor : '#a5a5a5')};
`;

const ShowPassIconStyled = styled.i<FsxInputProps>`
  position: absolute;
  cursor: pointer;
  right: 12px;
  top: ${props => (props.label === undefined ? '10px' : '16px')};
  font-weight: 100;
  font-size: 19px;
  &:hover {
    color: #8e8e8e;
  }
  color: ${props => props.iconColor || '#cacaca'};
`;

const Input = styled(KendoInput)<{
  width?: string | number;
  icon: boolean;
  iconPosition?: 'left' | 'right';
}>`
  width: ${props => props.width || '100%'};
  border-radius: 6px;
  padding: ${props =>
    `11px ${
      props.type === 'password' || (props.icon && props.iconPosition === 'right') ? '32px' : '16px'
    } 8px ${props.icon && props.iconPosition === 'left' ? '32px' : '16px'}`}!important;
  min-height: 39.05px;
  line-height: 1.5;
  font-size: 10pt;
  width: 100%;
  font-weight: 300;
`;

const FsxInput = React.forwardRef<HTMLInputElement | null, FsxInputProps>(
  (
    {
      className,
      label,
      error,
      required,
      icon = false,
      iconName,
      iconPosition = icon ? 'left' : undefined,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<any>(null);
    React.useEffect(() => {
      if (ref && typeof ref === 'function') {
      } else if (ref) {
        ref.current = inputRef.current;
      }
    }, []);

    const [state, setState] = React.useState({
      changed: false,
      startLongPress: false,
      showPasswordToggle: false,
    });

    const handleMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        if (!state.startLongPress)
          setState({...state, startLongPress: true, showPasswordToggle: true});
      },
      [props.type],
    );

    const handleMouseUp = React.useCallback(
      (e: React.MouseEvent) => {
        setTimeout(
          () => setState({...state, startLongPress: false, showPasswordToggle: false}),
          300,
        );
      },
      [props.type],
    );

    return (
      <FsxInputWrapper
        label={label}
        floatLabel={props.floatLabel}
        className={className}
        error={error || props.validationMessage}
        required={required}>
        {icon && (
          <IconStyled
            className={iconName}
            iconPosition={iconPosition}
            iconColor={props.iconColor}
          />
        )}
        <Input
          {...props}
          ref={inputRef}
          icon={icon}
          iconPosition={iconPosition}
          className={clx({
            'rounded-3xl': props.oval,
            'pl-4': icon,
          })}
          type={props.type === 'password' && !state.showPasswordToggle ? 'password' : 'text'}
          required={required}
        />
        {props.type === 'password' && (
          <ShowPassIconStyled
            label={label}
            className={
              state.startLongPress
                ? 'animated__icon ams-visibility-hidden'
                : 'animated__icon ams-visibility-visible'
            }
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          />
        )}
      </FsxInputWrapper>
    );
  },
);

export default FsxInput;
