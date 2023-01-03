import FsxDropDownList, {FsxDropdownListProps} from '../FsxDropDownList';
import {useField, useFormikContext} from 'formik';

import {DropDownListChangeEvent} from '@progress/kendo-react-dropdowns';
import React from 'react';
import {find} from 'lodash';

export interface FsxFormikDropDownListProps extends FsxDropdownListProps {
  name: string;
  dataItemKeyAsValue?: boolean;
}

//? Please use this new formik component refactored from FsxFormikDropDownList.
//? This component uses single wrapper for styling from a base component that
//? encapsulate kendo input components.
const FsxFormikDropDownList: React.VFC<FsxFormikDropDownListProps> = ({
  name,
  dataItemKeyAsValue = true,
  ...props
}) => {
  const {setFieldValue} = useFormikContext();

  const [field, meta] = useField(name);

  const {onChange: formikFieldOnChange, ...formikField} = field;

  const handleOnChange = (event: DropDownListChangeEvent) => {
    dataItemKeyAsValue
      ? setFieldValue(field.name, event.value[props.dataItemKey || ''])
      : formikFieldOnChange(event);

    props.onChange && props.onChange(event);
  };

  return (
    <FsxDropDownList
      {...formikField}
      {...props}
      onChange={handleOnChange}
      value={find(props.data, {[`${props.dataItemKey}`]: field.value}) || {}}
      validationMessage={meta.touched ? meta.error : undefined}
      valid={meta.touched ? !meta.error : true}
      className={`mb-3 ${props.className}`}
    />
  );
};

export default FsxFormikDropDownList;
