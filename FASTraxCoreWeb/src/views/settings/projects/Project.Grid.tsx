import {FsxGrid, Loader} from '../../../components/common';
import {GridColumn, GridProps} from '@progress/kendo-react-grid';

import KGridMenuFilter from '../../../plugins/KGridMenuFilter';
import React from 'react';
import {useProjects} from '@app/services/catalog/project.service';

const ProjectGrid: React.FC<{} & GridProps> = props => {
  const {isLoading, data} = useProjects();

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid {...props} data={data?.data} className="h-full">
          <GridColumn field="code" title="Code" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn
            field="client.name"
            title="Customer Name"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
          <GridColumn
            field="country.title"
            title="Country"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
        </FsxGrid>
      )}
    </>
  );
};

export default React.memo(ProjectGrid);
