import React from 'react';
import styled from 'styled-components';
import Inputmask from 'inputmask';
import FsxInputWrapper, {FsxInputWrapperProps} from '../FsxInputWrapper';
import FsxInput from '../FsxInput';
import {InputProps, Input as KendoInput} from '@progress/kendo-react-inputs';
import clx from 'classnames';
import CurrencyCodes from '../CurrencyInput/currencies';
import {Checkbox} from '@progress/kendo-react-inputs';

type CurrencyCodeTypes = typeof CurrencyCodes;
export interface FsxExtraCustomFieldStyleProps {
  icon?: boolean;
  iconName?: string;
  iconColor?: string;
  iconPosition?: 'left' | 'right';
  oval?: boolean;
}

export interface CurrencyInputProps {
  name?: string;
  digits?: number;
  currencyCode?: keyof CurrencyCodeTypes;
  value?: string;
  onValueChanged?: (e: number) => void;
}

export type FsxInputProps = InputProps &
  FsxInputWrapperProps &
  FsxExtraCustomFieldStyleProps &
  CurrencyInputProps;

const IconStyled = styled.i<FsxExtraCustomFieldStyleProps>`
  position: absolute;
  left: 12px;
  top: 14px;
  font-weight: 100;
  font-size: 16px;
  z-index: 1;
  color: ${props => (props.iconColor ? props.iconColor : '#a5a5a5')};
`;

const CurrencyWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  margin-top: 4px;
`;

const CurrencyCodeStyled = styled.div`
  background: green;
  flex-shrink: 0;
  padding: 0 10px;
  color: #fff;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  user-select: none;
  display: flex;
  align-items: center;
`;

const Input = styled(KendoInput)<{
  width?: string | number;
  icon: string;
  iconPosition?: 'left' | 'right';
}>`
  width: ${props => props.width || '100%'};
  border-radius: 6px;
  padding: ${props =>
    `11px ${
      props.type === 'password' || (props.icon && props.iconPosition === 'right') ? '32px' : '16px'
    } 8px ${props.icon && props.iconPosition === 'left' ? '32px' : '32px'}`}!important;
  min-height: 39.05px;
  line-height: 1.5;
  font-size: 10pt;
  width: 100%;
  font-weight: 300;
`;

const CurrencyStyled = styled(FsxInput)`
  outline: 0;
  text-align: right;
  width: 100%;
  display: block;
  padding: 0;
  height: 100%;

  > .k-textbox {
    border: 0 !important;
  }
`;

const CurrencyWrapStyled = styled.div`
  flex-grow: 1;
`;

const FsxCustomField = React.forwardRef<HTMLInputElement | null, FsxInputProps>(
  (
    {
      name,
      label,
      error,
      digits = 2,
      className,
      required,
      icon = false,
      iconName,
      currencyCode = 'USD',
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<any>(null);
    const numberRef = React.useRef<any>(null);
    const currencyRef = React.useRef<any>(null);
    const dateRef = React.useRef<any>(null);

    React.useEffect(() => {
      if (ref && typeof ref === 'function') {
      } else if (ref) {
        ref.current = inputRef.current;
      }
    }, []);

    React.useEffect(() => {
      if (ref && typeof ref === 'function') {
      } else if (ref) {
        ref.current = dateRef.current;
      }
    }, []);

    React.useEffect(() => {
      if (!currencyRef.current) return;

      var im = new Inputmask('currency', {
        prefix: '',
        digits: digits?.toString(),
      });

      im.mask(currencyRef.current.element);
    }, []);

    return (
      <FsxInputWrapper
        label={label}
        // Remove Floatlabel if custom type id is equal to (3) currency
        floatLabel={props.type !== '3' ? props.floatLabel : false}
        className={className}
        error={error || props.validationMessage}
        required={required}>
        {icon && <IconStyled className={iconName} iconColor={props.iconColor} />}
        {props.type === '1' && (
          <Input
            {...props}
            ref={inputRef}
            icon={String(icon)}
            className={clx({
              'rounded-3xl': props.oval,
              'pl-4': icon,
            })}
            required={required}
            type="text"
          />
        )}
        {props.type === '2' && (
          <Input
            {...props}
            ref={numberRef}
            icon={String(icon)}
            className={clx({
              'rounded-3xl': props.oval,
              'pl-4': icon,
            })}
            required={required}
            type="number"
          />
        )}
        {props.type === '3' && (
          <CurrencyWrapperStyled>
            <CurrencyCodeStyled>{currencyCode}</CurrencyCodeStyled>
            <CurrencyWrapStyled>
              <CurrencyStyled {...props} floatLabel={false} ref={currencyRef} />
            </CurrencyWrapStyled>
          </CurrencyWrapperStyled>
        )}
        {props.type === '4' && (
          <Input
            {...props}
            ref={inputRef}
            icon={String(icon)}
            className={clx({
              'rounded-3xl': props.oval,
              'pl-4': icon,
            })}
            required={required}
            type="date"
          />
        )}
        {props.type === '5' && <Checkbox ref={inputRef} required={required} />}
      </FsxInputWrapper>
    );
  },
);

export default FsxCustomField;
