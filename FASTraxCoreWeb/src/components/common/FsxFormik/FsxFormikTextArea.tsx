import FsxInputWrapper, {FsxInputWrapperProps} from '../FsxInputWrapper';

import React from 'react';
import styled from 'styled-components';
import {useField} from 'formik';

type TempCustomTextArea = FsxInputWrapperProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface FsxFormikTextArea extends TempCustomTextArea {
  name: string;
  valid?: boolean;
  validationMessage?: string;
}

const StyledTextArea = styled.textarea<FsxFormikTextArea>`
  border: solid 1px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  width: 100%;
  height: 100%;
  padding: 12px 16px 8px !important;
  outline: none;
`;

// !Issue: Kendo TextArea still passing a ref object rather than
// !the Element, Ticket already submitted waiting for response.
// ?For the meantime a temporary custom textarea will do the trick
// ?with the same wrapper from other base inputs.
const FsxFormikTextArea: React.VFC<FsxFormikTextArea> = ({
  name,
  className,
  label,
  error,
  required,
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <FsxInputWrapper label={label} className={className} error={error} required={required}>
      <StyledTextArea
        {...field}
        {...props}
        value={field.value ? field.value : ''}
        valid={meta.touched ? !meta.error : true}
        validationMessage={meta.touched ? meta.error : undefined}
      />
    </FsxInputWrapper>
  );
};

export default FsxFormikTextArea;
