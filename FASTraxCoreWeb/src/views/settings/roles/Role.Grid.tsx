import React from 'react';
import {FsxGrid} from '../../../components/common';
import {GridColumn, GridProps} from '@progress/kendo-react-grid';
import {useRoles} from '@app/services/catalog/role.service';
import KGridMenuFilter from '../../../plugins/KGridMenuFilter';

const RoleGrid: React.FC<{} & GridProps> = props => {
  const {isLoading, data} = useRoles();

  return (
    <>
      {!isLoading && (
        <FsxGrid {...props} data={data?.data} className="h-full">
          <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn
            field="description"
            title="Description"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
        </FsxGrid>
      )}
    </>
  );
};

export default RoleGrid;
