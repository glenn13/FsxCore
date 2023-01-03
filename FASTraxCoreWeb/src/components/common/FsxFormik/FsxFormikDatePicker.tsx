import FsxDatePicker, {FsxDatePickerProps} from '../FsxDatePicker';

import React from 'react';
import {useField, useFormikContext} from 'formik';
import moment from 'moment';
export interface FsxFormikDatePickerProps extends FsxDatePickerProps {
  name: string;
}

//? Please use this new formik component refactored from FsxFormikDatepicker.
//? This component uses single wrapper for styling from a base component that
//? encapsulate kendo input components.
const FsxFormikDatePicker: React.VFC<FsxFormikDatePickerProps> = ({name, ...props}) => {
  const [field, meta] = useField<Date>(name);
  const {value: formikFieldValue, ...formikFieldProps} = field;
  const [value, setValue] = React.useState<Date | null>();
  const {setFieldValue} = useFormikContext();

  const changeValue = React.useCallback((value: any) => {
    const newValue = value ? (value instanceof Date ? value : moment(value).toDate()) : null;

    setValue(newValue);
    setFieldValue(name, newValue);
  }, []);

  React.useEffect(() => {
    const formValue = props.value || field.value;

    changeValue(formValue);
  }, [props.value || field.value]);

  const handleOnChange = React.useCallback((e: any) => changeValue(e.value), []);

  return (
    <FsxDatePicker
      {...props}
      onChange={handleOnChange}
      valid={meta.touched ? !meta.error : true}
      validationMessage={meta.touched ? meta.error : undefined}
      value={value}
    />
  );
};

export default React.memo(FsxFormikDatePicker);
