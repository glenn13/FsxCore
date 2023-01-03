import FsxNumericTextBox, {FsxNumericTextBoxProps} from '../FsxNumericTextBox';

import React from 'react';
import {useField} from 'formik';

export interface FsxFormikNumericTextBoxProps extends FsxNumericTextBoxProps {
  name: string;
}

//? Please use this new formik component refactored.
//? This component uses single wrapper for styling from a base component that
//? encapsulate kendo input components.
const FsxFormikNumericTextBox: React.FC<FsxFormikNumericTextBoxProps> = ({name, ...props}) => {
  const [field, meta] = useField(name);

  return (
    <FsxNumericTextBox
      {...field}
      {...props}
      valid={meta.touched ? !meta.error : true}
      validationMessage={meta.touched ? meta.error : undefined}
    />
  );
};

export default FsxFormikNumericTextBox;
