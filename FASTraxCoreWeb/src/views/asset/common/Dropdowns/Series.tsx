import React from 'react';
import { useSeries } from '@app/services/asset/standardentries/series.service';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';

export type SeriesDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
  modelId: number;
};

const SeriesDropdown: React.FC<SeriesDropdownProps> = ({
  name,
  label,
  modelId,
  isFormik,
  textField,
  ...rest
}) => {
  const series = useSeries();

  //const data = React.useMemo(() => {
  //  return series.data?.data.filter(d => d.modelId === modelId);
  //}, [series, modelId]);

  const props = {
    ...rest,
    name: name || 'seriesId',
    label: label || 'Series:',
    dataItemKey: 'id',
    textField: 'title',
    filterKey: 'modelId',
      filterValue: modelId,
      data: series.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(SeriesDropdown);
