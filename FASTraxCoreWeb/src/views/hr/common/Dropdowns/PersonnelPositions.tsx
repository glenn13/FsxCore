import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import {FsxFormikDropDownListProps} from '@app/components/common/FsxFormik/FsxFormikDropDownList';
import React from 'react';
import {usePersonnelPositions} from '@app/services/hr/standardentries/personnelpositions.service';

export type PersonnelPositionProps = FsxFormikDropDownListProps & {
  isFormik?: boolean;
};

const PersonnelPosition: React.FC<PersonnelPositionProps> = ({...rest}) => {
  const {isLoading, data: positions} = usePersonnelPositions();

  return (
    <FsxFormikDropDownList
      {...rest}
      loading={isLoading}
      dataItemKey="id"
      textField="title"
      data={positions?.data}
      filterable
    />
  );
};

export default React.memo(PersonnelPosition);
