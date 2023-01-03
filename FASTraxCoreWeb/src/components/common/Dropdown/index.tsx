import React, {CSSProperties} from 'react';
import {
  DropDownList,
  DropDownListChangeEvent,
  DropDownListProps,
} from '@progress/kendo-react-dropdowns';
import styled from 'styled-components';

const LabelStyled = styled.label`
  position: absolute;
  left: 7px;
  top: -7px;
  background: #fff;
  padding: 0 4px;
  font-size: 9pt;
  font-family: Roboto;
  font-weight: 300;
  color: #888787;
  z-index: 10;
`;

const InputWrapperStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export type FsxDropdownProps = DropDownListProps & {
  value?: any;
  errors?: string[];
  styles?: CSSProperties;
  containerClassName?: string;
  onSelect?: (value: any) => void;
  floatingLabel?: boolean;
};

const FsxDropdown: React.FC<FsxDropdownProps> = ({
  data,
  label,
  value,
  errors,
  styles,
  textField,
  dataItemKey,
  containerClassName,
  onSelect,
  onChange,
  floatingLabel,
  ...rest
}) => {
  const [changed, setChanged] = React.useState(true);

  React.useEffect(() => {
    if (errors && errors.length > 0) setChanged(false);
  }, [errors]);

  const getSelected = React.useCallback(
    () => (dataItemKey && data && data.find(d => d[dataItemKey] === value)) || value,
    [data, value, dataItemKey],
  );

  const handleSelect = React.useCallback(
    (e: DropDownListChangeEvent) => {
      if (!changed) setChanged(true);

      if (onSelect) {
        if (!dataItemKey) return onSelect(e.target.value);

        onSelect(e.target.value[dataItemKey]);
      }

      onChange && onChange(e);
    },
    [changed, dataItemKey, onSelect, onChange],
  );

  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <InputWrapperStyled>
        {!floatingLabel && <LabelStyled>{label}</LabelStyled>}
        <DropDownList
          {...rest}
          data={data || []}
          label={floatingLabel ? label : ''}
          value={getSelected()}
          textField={textField}
          onChange={handleSelect}
          dataItemKey={dataItemKey}
          style={styles || {width: '100%'}}
        />
        {!changed && errors && errors.length > 0 && (
          <span className="text-xs text-red-400 pt-1">{errors[0]}</span>
        )}
      </InputWrapperStyled>
    </div>
  );
};

export default React.memo(FsxDropdown);
