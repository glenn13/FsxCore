import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useFormPages} from '@app/services/catalog/formpage.service';

export type FormPagesDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const FormPagesDropdown: React.FC<FormPagesDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const formPages = useFormPages();

  const props = {
    ...rest,
    name: name || 'formPageId',
    label: label || 'Form Page:',
    dataItemKey: 'id',
    textField: 'name',
    data: formPages.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(FormPagesDropdown);
