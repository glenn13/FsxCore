import * as React from 'react';
import {FormikProps} from 'formik';

export const useFormikRef = <T>() => {
  const [formikRef, setFormikRef] = React.useState<FormikProps<T>>();

  const handleFormikRefChange = React.useCallback(
    (instance: FormikProps<T>) => {
      if (formikRef || !instance) return;

      setFormikRef(instance);
    },
    [formikRef],
  );

  return {current: formikRef, onRefChange: formikRef ? null : handleFormikRefChange};
};
