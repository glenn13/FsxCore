import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import Inputmask from 'inputmask';
import FsxInput, {FsxInputProps} from '../FsxInput';
import {CurrencyCodes} from './currencies';

type CurrencyCodeTypes = typeof CurrencyCodes;

export interface CurrencyInputProps extends FsxInputProps {
  name: string;
  digits?: number;
  currencyCode?: keyof CurrencyCodeTypes;
  value?: number;
  onValueChanged?: (e: number) => void;
}

const InputWrapperStyled = styled.div`
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

const InputWrapStyled = styled.div`
  flex-grow: 1;
`;

const InputStyled = styled(FsxInput)`
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

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  name,
  digits = 2,
  value = 0,
  currencyCode = 'USD',
  ...props
}) => {
  const getParseVal = (value: string | number) =>
    parseFloat(value.toString().replace(/[, ]+/g, ''));

  const inputRef = useRef<any>(null);
  const [inputVal, setInputVal] = useState<number | string | undefined>(value);

  const handleInputChange = React.useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const {value} = e.currentTarget;
    setInputVal(value);

    props.onValueChanged && props.onValueChanged(getParseVal(value));
  }, []);

  React.useEffect(() => {
    if (!inputRef.current) return;

    var im = new Inputmask('currency', {
      prefix: '',
      digits: digits?.toString(),
    });

    im.mask(inputRef.current.element);
  }, []);

  return (
    <InputWrapperStyled>
      <CurrencyCodeStyled>{currencyCode}</CurrencyCodeStyled>
      <InputWrapStyled>
        <InputStyled
          {...props}
          floatLabel={false}
          ref={inputRef}
          value={inputVal}
          onInput={props.onInput || handleInputChange}
        />
      </InputWrapStyled>
    </InputWrapperStyled>
  );
};

export default React.memo(CurrencyInput);
