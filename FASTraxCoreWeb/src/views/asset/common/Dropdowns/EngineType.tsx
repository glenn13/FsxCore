import React from 'react';
import { useEngineTypes } from '@app/services/asset/standardentries/engineTypes.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type EngineTypesDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const EngineTypesDropdown: React.FC<EngineTypesDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const engineTypes = useEngineTypes();

  const props = {
    ...rest,
    name: name || 'engineTypeId',
    label: label || 'Engine Type:',
    dataItemKey: 'id',
    textField: 'title',
    data: engineTypes.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(EngineTypesDropdown);
