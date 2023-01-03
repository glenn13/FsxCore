import React, {PropsWithChildren} from 'react';
import {FsxDrawer, Button} from '@app/components/common';
import {FsxFormikInput, FsxFormikTextArea} from '@app/components/common/FsxFormik';
import {Form, Formik, FormikProps} from 'formik';
import {StandardEntry} from '@app/entities/StandardEntry';
import _ from 'lodash';

export interface IAssetCategoryEntryProps<T> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialValue: T | StandardEntry;
  validationSchema?: any;
  title: string;
  onSubmit: (values: any) => void;
  formikRef?: React.RefObject<any>;
}

const StandardEntryForm: <T = unknown>(
  childrenProps: PropsWithChildren<IAssetCategoryEntryProps<T>>,
) => any = ({
  title,
  isOpen,
  setIsOpen,
  initialValue,
  validationSchema,
  onSubmit,
  children,
  formikRef,
  ...props
}) => {
  const handleInputToUpperCase = (e: any) => (e.target.value = ('' + e.target.value).toUpperCase());
  const handleInputToCapitalize = (e: any) =>
    (e.target.value = '' + e.target.value.replace(/^(.)|\s+(.)/g, (c: string) => c.toUpperCase()));

  return (
    <FsxDrawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="flex-col px-4 pt-10"
      unMountChildren={true}
      title={title}>
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema || null}>
        <Form className="flex flex-1 flex-col w-full items-center justify-between pb-4 px-6">
          <div className="w-full h-full">
            {_.has(initialValue, 'code') && (
              <FsxFormikInput
                label="Code:"
                name="code"
                onInput={handleInputToUpperCase}
                required
                className="mb-5"
              />
            )}
            {_.has(initialValue, 'title') && (
              <FsxFormikInput
                label="Title:"
                name="title"
                onInput={handleInputToCapitalize}
                required
                className="mb-5"
              />
            )}
            {_.has(initialValue, 'description') && (
              <FsxFormikInput label="Description:" name="description" className="mb-5" />
            )}
            {children}
          </div>
          <Button block oval shadow ripple>
            Submit
          </Button>
        </Form>
      </Formik>
    </FsxDrawer>
  );
};

export default React.memo(StandardEntryForm);
