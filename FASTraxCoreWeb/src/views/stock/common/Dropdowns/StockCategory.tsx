import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import { useStockCategories } from '@app/services/stock/standardentries/stockCategory.service';

export type StockCategoryDropdownProps = FsxDropdownProps & {
  isFormik?: boolean;
};

const StockCategoryDropdown: React.FC<StockCategoryDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  ...rest
}) => {
  const categories = useStockCategories();

  const props = {
    ...rest,
    name: name || 'stockCategoryId',
    label: label || 'Stock Category:',
    dataItemKey: 'id',
    textField: 'title',
    data: categories.data?.data,
  };

  if (isFormik) return <FsxFormikDropDownList {...props} />;

  return <FsxDropdown {...props} />;
};

export default React.memo(StockCategoryDropdown);
