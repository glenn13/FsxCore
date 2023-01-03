import React from 'react';
import {GridColumn} from '@app/helpers/types';
import {BaseEntity} from '@app/entities/base';
import {FsxDrawer, FsxTable} from '@app/components/common';
import FsxTableActions from '@app/components/common/FsxTable/Actions';

export interface GridWithDrawerProps {
  onDelete?: () => void;
  onExport?: () => void;
  onSelect?: (value: number) => void;
  onSubmit?: () => boolean;
  onSubmitPromise?: () => Promise<boolean>;
  drawerTitle?: string;
  data?: BaseEntity[];
  columns?: GridColumn[];
  children?: React.ReactNode | React.ReactNode[];
}

const GridWithDrawer: React.FC<GridWithDrawerProps> = ({
  onDelete,
  onExport,
  onSelect,
  onSubmit,
  onSubmitPromise,
  drawerTitle,
  data,
  columns,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = React.useCallback(() => {
    if (!onSubmit) return;

    const isSuccessful = onSubmit();

    if (!isSuccessful) return;

    setIsOpen(false);
  }, [onSubmit]);

  const handleSubmitPromise = React.useCallback(async () => {
    if (!onSubmitPromise) return;

    const isSuccessful = await onSubmitPromise();

    if (!isSuccessful) return;

    setIsOpen(false);
  }, [onSubmitPromise]);

  return (
    <div className="flex flex-1 flex-col">
      <FsxDrawer
        isOpen={isOpen}
        unMountChildren={true}
        title={drawerTitle}
        onClose={() => setIsOpen(false)}
        onSubmit={onSubmit && handleSubmit}
        onSubmitPromise={onSubmitPromise && handleSubmitPromise}>
        {children}
      </FsxDrawer>
      <FsxTable
        dataKey="id"
        columns={columns}
        data={data}
        onRowClick={e => onSelect && onSelect(e.dataItem['id'])}>
        <FsxTableActions onAdd={() => setIsOpen(true)} onDelete={onDelete} onExport={onExport} />
      </FsxTable>
    </div>
  );
};

export default React.memo(GridWithDrawer);
