import FsxInputWrapper, {FsxInputWrapperProps} from '../FsxInputWrapper';
import {MaskedTextBox, MaskedTextBoxProps} from '@progress/kendo-react-inputs';

import React from 'react';
import styled from 'styled-components';

export type FsxMaskedTextBoxProps = MaskedTextBoxProps & FsxInputWrapperProps;

const StyledMaskedTextBox = styled(MaskedTextBox)`
  > input {
    min-height: 39.05px;
    border-radius: 6px;
    padding: 12px 16px 8px 16px !important;
  }
`;

const FsxMaskedTextBox: React.VFC<FsxMaskedTextBoxProps> = ({
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
      <StyledMaskedTextBox className="h-full" {...props} width={width || '100%'} />
    </FsxInputWrapper>
  );
};

export default FsxMaskedTextBox;
