import React from 'react';

import {FsxInputProps} from '../FsxInput';
import {useField, useFormikContext} from 'formik';
import CurrencyInput, {CurrencyInputProps} from '../CurrencyInput';

export interface FsxFormikInputProps extends FsxInputProps {
  name: string;
}

const FsxFormikInput: React.VFC<FsxFormikInputProps & CurrencyInputProps> = ({name, ...props}) => {
  const [field, meta] = useField(name);
  const {setFieldValue} = useFormikContext();

  return (
    <CurrencyInput
      {...field}
      {...props}
      onValueChanged={e => setFieldValue(name, e)}
      valid={meta.touched ? !meta.error : true}
      validationMessage={meta.touched ? meta.error : undefined}
      className={`mb-3 ${props.className}`}
    />
  );
};

export default FsxFormikInput;
