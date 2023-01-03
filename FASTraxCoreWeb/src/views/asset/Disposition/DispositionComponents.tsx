import React, {useRef, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {RadialItem} from '@app/store/app/types';
import {FsxTable} from '@app/components/common';
import {useDispositionComponent} from '@app/hooks/useDispositionComponent';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';
import DispositionComponent from '@app/entities/asset/disposition/component/DispositionComponent';
import {
  getDispositionComponents,
  deleteDispositionComponent,
} from '@app/services/asset/disposition/dispositionComponent.service';
import {Confirm, Toast} from '@app/components/common';
import usePermissions from '@app/hooks/usePermisions';
import {AssetDisposition as AssetDispositionPermission} from '@app/helpers/permissions/action.key';
import {setStatus} from '@app/store/common/status.reducer';
import {RootState} from '../../../store/rootReducer';
import {useDispatch, useSelector} from 'react-redux';

export interface DispositionComponentsProps {}

const DispositionComponents: React.FC<DispositionComponentsProps> = () => {
  const history = useHistory();
  const disposition = useDispositionComponent({rerenderDelayMS: 100});
  const [dispositions, setDispositions] = React.useState<DispositionComponent[]>([]);

  const [selectedDisposition, setSelectedDisposition] = React.useState<DispositionComponent>();

  const dispatch = useDispatch();
  const {status} = useSelector((state: RootState) => {
    return {
      status: state.status,
    };
  });

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const {hasPermission} = usePermissions();
  const hasComponentNew = hasPermission(AssetDispositionPermission.ComponentNew);
  const hasComponentView = hasPermission(AssetDispositionPermission.ComponentView);
  const hasComponentEdit = hasPermission(AssetDispositionPermission.ComponentEdit);
  const hasComponentDelete = hasPermission(AssetDispositionPermission.ComponentDelete);
  const hasComponentPrint = hasPermission(AssetDispositionPermission.ComponentPrint);
  const hasComponentExport = hasPermission(AssetDispositionPermission.ComponentExport);

  React.useEffect(() => {
    const items: RadialItem[] = [
      {
        title: 'View',
        icon: 'visibility-visible',
        disabled: !hasComponentView || !selectedDisposition,
      },
      {
        title: 'Update',
        icon: 'edit',
        disabled: !hasComponentEdit || !selectedDisposition,
        onClick: handleUpdate,
      },
      {
        title: 'Delete',
        icon: 'trash',
        disabled: !hasComponentDelete || !selectedDisposition,
        onClick: handleDelete,
      },
      {title: 'Print', icon: 'print', disabled: !hasComponentPrint || !selectedDisposition},
      {title: 'Export', icon: 'excel', disabled: !hasComponentExport || !selectedDisposition},
    ];

    disposition.generateRadialMenu(items);
  }, [
    disposition,
    selectedDisposition,
    hasComponentNew,
    hasComponentView,
    hasComponentEdit,
    hasComponentDelete,
    hasComponentDelete,
    hasComponentPrint,
    hasComponentExport,
  ]);

  const handleUpdate = React.useCallback(() => {
    if (selectedDisposition !== undefined) {
      if (hasComponentEdit) {
        history.push(`/app/asset/disposition/component/${selectedDisposition.id}`);
      } else {
        dispatch(setStatus('No Permission Access'));
      }
    }
  }, [selectedDisposition, history]);

  const handleDelete = React.useCallback(() => {
    if (selectedDisposition !== undefined) {
      Confirm({
        text: `Are you sure you want to delete this "${selectedDisposition.component?.assetRefId}" record? `,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        icon: 'question',
        onConfirm: () =>
          deleteDispositionComponent(selectedDisposition.id).then(() => {
            getDispositionComponents().then(response => setDispositions(response.data));
          }),
      });
    }
  }, [selectedDisposition, history]);

  const handleClose = () => dispatch(setStatus(''));

  useEffect(() => {
    return () => {
      dispatch(setStatus(''));
    };
  }, [dispatch]);

  React.useEffect(() => {
    getDispositionComponents().then(response => setDispositions(response.data));
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      {status !== '' && (
        <Toast
          title="System Notification"
          message={status}
          type="danger"
          position="top-right"
          onClose={handleClose}
        />
      )}
      <FsxExcelExport
        fileName={`Disposition_Components_${moment().format('YYYYMMDDHHmm')}`}
        data={dispositions}
        ref={excelExportRef}
        columns={disposition.columns}>
        <FsxTable
          className="h-full"
          dataKey="id"
          data={dispositions}
          columns={disposition.columns}
          onRowClick={e => setSelectedDisposition(e.dataItem)}
          onRowDoubleClick={e => handleUpdate()}>
          <FsxTableActions onExport={exportToExcel} />
        </FsxTable>
      </FsxExcelExport>
    </div>
  );
};

export default DispositionComponents;
