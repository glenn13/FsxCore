import FsxInput, {FsxInputProps} from '../FsxInput';

import React from 'react';
import {useField, useFormikContext} from 'formik';
import {useDebounce} from '@app/hooks/useDebounce';

export interface FsxFormikInputProps extends FsxInputProps {
  name: string;
}

//? Please use this new formik component refactored from FsxFormikInput2.
//? This component uses single wrapper for styling from a base component that
//? encapsulate kendo input components.
const FsxFormikInput: React.VFC<FsxFormikInputProps> = ({name, ...props}) => {
  const [field, meta] = useField(name);
  const [value, setValue] = React.useState(props.value);
  const [setDebouncedState] = useDebounce(value, (prop: any) => applySetField(prop), 500);
  const {setFieldValue} = useFormikContext();

  const applySetField = React.useCallback(
    (str: string) => {
      if (!name) return;

      setFieldValue(name, str);
      /* eslint-disable react-hooks/exhaustive-deps */
    },
    [name],
  );

  const handleInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setDebouncedState(event.target.value);
  }, []);

  return (
    <FsxInput
      {...field}
      {...props}
      onInput={props.onInput || handleInputChange}
      valid={meta.touched ? !meta.error : true}
      validationMessage={meta.touched ? meta.error : undefined}
      className={`mb-3 ${props.className}`}
    />
  );
};

export default FsxFormikInput;
