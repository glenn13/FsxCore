import FsxInputWrapper, {FsxInputWrapperProps} from '../FsxInputWrapper';
import {TimePicker, TimePickerProps} from '@progress/kendo-react-dateinputs';

import React from 'react';

export type FsxTimePickerProps = TimePickerProps & FsxInputWrapperProps;

const FsxTimePicker: React.VFC<FsxTimePickerProps> = ({
  className,
  format,
  label,
  width,
  error,
  required,
  ...props
}) => {
  return (
    <FsxInputWrapper
      label={label}
      className={className}
      error={error || props.validationMessage}
      required={required}>
      <TimePicker {...props} format={format || 'HH:mm'} width={width || '100%'} />
    </FsxInputWrapper>
  );
};

export default FsxTimePicker;
