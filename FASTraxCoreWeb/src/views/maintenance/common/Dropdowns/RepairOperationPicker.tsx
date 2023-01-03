import React, {InputHTMLAttributes} from 'react';
import FsxFormikDropTable from '@app/components/common/FsxFormik/FsxFormikDropTable';
import {useRepairOperations} from '@app/services/maintenance/standardentries/repairOperation.service';
import {GridColumn} from '@app/helpers/types';
import _ from 'lodash';

export interface RepairOperationPickerProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  assetCategoryId?: number;
}

const RepairOperationPicker: React.FC<RepairOperationPickerProps> = ({name, label, assetCategoryId, ...rest}) => {
  const {isLoading, data: repairOperations} = useRepairOperations({assetCategoryId});

  const columns: GridColumn[] = [
    {field: 'description', title: 'Description', width: 250},
    {field: 'repairGroup.description', title: 'Repair Group', width: 300},
    {field: 'repairSubGroup.description', title: 'Repair Sub-Group', width: 300},
  ];

  const props = {
    ...rest,
    name: name || 'repairOperationId',
    label: label || 'Repair Operation',
    dataItemKey: 'id',
    textField: 'description',
    data: _.sortBy(repairOperations?.data, d => d.id),
    options: {group: [{field: 'description'}]},
  };

  return <FsxFormikDropTable isLoading={isLoading} columns={columns} position="bottom-right" {...props} />;
};

export default React.memo(RepairOperationPicker);
