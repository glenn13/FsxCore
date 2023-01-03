import FsxInputWrapper, {FsxInputWrapperProps} from '../FsxInputWrapper';
import {NumericTextBox, NumericTextBoxProps} from '@progress/kendo-react-inputs';

import React from 'react';
import styled from 'styled-components';

export type FsxNumericTextBoxProps = NumericTextBoxProps & FsxInputWrapperProps;

const StyledFsxNumericTextBox = styled(NumericTextBox)`
  .k-numeric-wrap > .k-input {
    padding: 4px 16px;
  }

  .k-numeric-wrap,
  .k-numeric-wrap:hover,
  .k-numeric-wrap .k-select,
  .k-numeric-wrap .k-select:hover {
    background-color: transparent !important;
    background-image: none !important;
  }
`;

const FsxNumericTextBox: React.VFC<FsxNumericTextBoxProps> = ({
  className,
  label,
  error,
  required,
  width,
  ...props
}) => {
  return (
    <FsxInputWrapper
      label={label}
      className={className}
      error={error || props.validationMessage}
      required={required}>
      <StyledFsxNumericTextBox {...props} width={width || '100%'} />
    </FsxInputWrapper>
  );
};

export default FsxNumericTextBox;
