import FsxCheckbox, {FsxCheckboxProps} from '../FsxCheckbox';
import {useField, useFormikContext} from 'formik';

import {CheckboxChangeEvent} from '@progress/kendo-react-inputs';
import React from 'react';

//? Please use this new formik component.
//? This component uses single wrapper for styling from a base component that
//? encapsulate kendo input components.
//? - Raised a ticket @progress/kendo Checkbox component is returning a ref object.
export interface FsxFormikCheckboxProps extends FsxCheckboxProps {
  name: string;
}

const FsxFormikCheckbox: React.FC<FsxFormikCheckboxProps> = ({name, ...props}) => {
  const [field, meta] = useField(name);
  const [value, setValue] = React.useState(props.value || field.value);
  const {setFieldValue} = useFormikContext();

  const handleOnChange = (e: CheckboxChangeEvent) => {
    setValue(e.value);
    setFieldValue(name, e.value);
  };

  return (
    <FsxCheckbox
      {...field}
      {...props}
      onChange={handleOnChange}
      value={value}
      valid={meta.touched ? !meta.error : true}
      validationMessage={meta.touched ? meta.error : undefined}
    />
  );
};

export default React.memo(FsxFormikCheckbox);
