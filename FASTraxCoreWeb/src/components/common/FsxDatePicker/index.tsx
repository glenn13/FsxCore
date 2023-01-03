import React from 'react';
import {
  DatePicker,
  DatePickerProps,
  Calendar,
  ActiveView,
  CalendarProps,
} from '@progress/kendo-react-dateinputs';
import FsxInputWrapper, {FsxInputWrapperProps} from '../FsxInputWrapper';

type FsxDatePickerViewProps = {
  enabled: boolean;
  view: ActiveView;
};

export type FsxDatePickerProps = DatePickerProps &
  FsxInputWrapperProps & {
    defaultView?: FsxDatePickerViewProps;
  };

const FsxDatePicker: React.VFC<FsxDatePickerProps> = ({
  className,
  format,
  label,
  width,
  error,
  required,
  defaultView,
  ...props
}) => {
  const calendarComponent = React.useCallback((props: CalendarProps) => {
    return (
      <Calendar
        {...props}
        weekNumber={false}
        navigation={false}
        bottomView={defaultView?.view || 'month'}
        topView={defaultView?.view || 'month'}
        max={props.max || new Date()}
      />
    );
  }, []);

  return (
    <FsxInputWrapper
      label={label}
      className={className}
      error={error || props.validationMessage}
      required={required}>
      <DatePicker
        {...props}
        calendar={defaultView && defaultView.enabled ? calendarComponent : undefined}
        format={format || 'MM/dd/yyyy'}
        width={width || '100%'}
      />
    </FsxInputWrapper>
  );
};

export default React.memo(FsxDatePicker);
