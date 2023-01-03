import {Checkbox, CheckboxProps} from '@progress/kendo-react-inputs';
import FsxInputWrapper, {FsxInputWrapperProps} from '../FsxInputWrapper';

import React from 'react';
import styled from 'styled-components';

export type FsxCheckboxProps = CheckboxProps & FsxInputWrapperProps;

const StyledFsxInputWrapper = styled(FsxInputWrapper)`
  min-height: 46.05px;
`;

const FsxCheckbox: React.VFC<FsxCheckboxProps> = ({
  className,
  error,
  required,
  withFormWrapper,
  ...props
}) => {
  return (
    <StyledFsxInputWrapper
      className={`justify-center ${className !== undefined ? className : ''}`}
      error={error || props.validationMessage}
      required={required}
      withFormWrapper={withFormWrapper}>
      <Checkbox {...props} />
    </StyledFsxInputWrapper>
  );
};

export default FsxCheckbox;
