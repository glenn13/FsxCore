import FsxInputWrapper, {FsxInputWrapperProps} from '../FsxInputWrapper';
import {TextArea, TextAreaProps} from '@progress/kendo-react-inputs';

import React from 'react';
import styled from 'styled-components';

export type FsxTextAreaProps = TextAreaProps & FsxInputWrapperProps;

const StyledTextArea = styled(TextArea)<FsxTextAreaProps>`
  border-radius: 6px;
  width: 100%;
  height: 100%;
  > textarea {
    padding: 12px 16px 8px !important;
  }
`;

const FsxTextArea: React.VFC<FsxTextAreaProps> = ({
  className,
  label,
  error,
  required,
  ...props
}) => {
  return (
    <FsxInputWrapper
      label={label}
      className={className}
      error={error || props.validationMessage}
      required={required}>
      <StyledTextArea {...props} />
    </FsxInputWrapper>
  );
};

export default FsxTextArea;
