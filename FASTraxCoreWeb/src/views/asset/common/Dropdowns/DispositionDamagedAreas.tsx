import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {useDispositionDamagedAreas} from '@app/services/asset/standardentries/dispositionDamagedAreas.service';

export type DispositionDamagedAreasDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
  assetTypeId: number;
  currentDamagedAreaId?: number[];
};

const DispositionDamagedAreasDropdown: React.FC<DispositionDamagedAreasDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  assetTypeId,
  currentDamagedAreaId,
  ...rest
}) => {
  const dispositionAreas = useDispositionDamagedAreas();

  const data = React.useMemo(() => {
    return dispositionAreas.data?.data.filter(
      d => d.assetTypeId === assetTypeId && !currentDamagedAreaId?.includes(d.id),
    );
  }, [dispositionAreas, assetTypeId, currentDamagedAreaId]);

  const props = {
    ...rest,
    name: name || 'dispositionDamagedAreaId',
    label: label || 'Disposition Damaged Area:',
    dataItemKey: 'id',
    textField: 'name',
    data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(DispositionDamagedAreasDropdown);
