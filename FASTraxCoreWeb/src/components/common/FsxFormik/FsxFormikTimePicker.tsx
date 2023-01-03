import FsxTimePicker, {FsxTimePickerProps} from '../FsxTimePicker';
import {useField, useFormikContext} from 'formik';

import React from 'react';

export interface FsxFormikTimePickerProps extends FsxTimePickerProps {
  name: string;
}

//? This component uses single wrapper for styling from a base component that
//? encapsulate kendo input components.
//? - Kendo issues: Formik handleBlur throwing error id or name not passed,
//? due to Kendo TimePicker have multiple nested input inside.
const FsxFormikTimePicker: React.VFC<FsxFormikTimePickerProps> = ({name, ...props}) => {
  const [field, meta] = useField(name);
  const {setFieldTouched} = useFormikContext();

  const handleOnBlur = (_event: React.FocusEvent<HTMLDivElement>) => {
    setFieldTouched(name, true);
  };

  return (
    <FsxTimePicker
      {...field}
      {...props}
      onBlur={handleOnBlur}
      valid={meta.touched ? !meta.error : true}
      validationMessage={meta.touched ? meta.error : undefined}
    />
  );
};

export default FsxFormikTimePicker;
