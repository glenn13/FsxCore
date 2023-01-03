import FsxMaskedTextBox, {FsxMaskedTextBoxProps} from '../FsxMaskedTextBox';

import React from 'react';
import {useField} from 'formik';

export interface FsxFormikMaskedTextBox extends FsxMaskedTextBoxProps {
  name: string;
}

//? This component uses single wrapper for styling from a base component that
//? encapsulate kendo input components.
const FsxFormikMaskedTextBox: React.VFC<FsxFormikMaskedTextBox> = ({name, ...props}) => {
  const [field, meta] = useField(name);

  return (
    <FsxMaskedTextBox
      {...field}
      {...props}
      valid={meta.touched ? !meta.error : true}
      validationMessage={meta.touched ? meta.error : undefined}
    />
  );
};

export default FsxFormikMaskedTextBox;
