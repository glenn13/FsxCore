import React, {useRef, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {RadialItem} from '@app/store/app/types';
import {FsxTable} from '@app/components/common';
import {useDispositionVehicle} from '@app/hooks/useDispositionVehicle';
import DispositionVehicle from '@app/entities/asset/disposition/vehicle/DispositionVehicle';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';
import {
  getDispositionVehicles,
  deleteDispositionVehicle,
} from '@app/services/asset/disposition/dispositionVehicle.service';
import {Confirm, Toast} from '@app/components/common';
import usePermissions from '@app/hooks/usePermisions';
import {AssetDisposition as AssetDispositionPermission} from '@app/helpers/permissions/action.key';
import {setStatus} from '@app/store/common/status.reducer';
import {RootState} from '../../../store/rootReducer';
import {useDispatch, useSelector} from 'react-redux';

export interface DispositionVehiclesProps {}

const DispositionVehicles: React.FC<DispositionVehiclesProps> = () => {
  const history = useHistory();
  const disposition = useDispositionVehicle({rerenderDelayMS: 100});
  const [dispositions, setDispositions] = React.useState<DispositionVehicle[]>([]);

  const [selectedDisposition, setSelectedDisposition] = React.useState<DispositionVehicle>();

  const dispatch = useDispatch();
  const {status} = useSelector((state: RootState) => {
    return {
      status: state.status,
    };
  });

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const {hasPermission} = usePermissions();
  const hasVehicleNew = hasPermission(AssetDispositionPermission.VehicleNew);
  const hasVehicleView = hasPermission(AssetDispositionPermission.VehicleView);
  const hasVehicleEdit = hasPermission(AssetDispositionPermission.VehicleEdit);
  const hasVehicleDelete = hasPermission(AssetDispositionPermission.VehicleDelete);
  const hasVehiclePrint = hasPermission(AssetDispositionPermission.VehiclePrint);
  const hasVehicleExport = hasPermission(AssetDispositionPermission.VehicleExport);

  React.useEffect(() => {
    const items: RadialItem[] = [
      {
        title: 'View',
        icon: 'visibility-visible',
        disabled: !hasVehicleView || !selectedDisposition,
      },
      {
        title: 'Update',
        icon: 'edit',
        disabled: !hasVehicleEdit || !selectedDisposition,
        onClick: handleUpdate,
      },
      {
        title: 'Delete',
        icon: 'trash',
        disabled: !hasVehicleDelete || !selectedDisposition,
        onClick: handleDelete,
      },
      {title: 'Print', icon: 'print', disabled: !hasVehiclePrint || !selectedDisposition},
      {title: 'Export', icon: 'excel', disabled: !hasVehicleExport || !selectedDisposition},
    ];

    disposition.generateRadialMenu(items);
  }, [
    disposition,
    selectedDisposition,
    hasVehicleNew,
    hasVehicleView,
    hasVehicleEdit,
    hasVehicleDelete,
    hasVehicleDelete,
    hasVehiclePrint,
    hasVehicleExport,
  ]);

  const handleUpdate = React.useCallback(() => {
    if (selectedDisposition !== undefined) {
      if (hasVehicleEdit) {
        history.push(`/app/asset/disposition/vehicle/${selectedDisposition.id}`);
      } else {
        dispatch(setStatus('No Permission Access'));
      }
    }
  }, [selectedDisposition, history]);

  const handleDelete = React.useCallback(() => {
    if (selectedDisposition !== undefined) {
      Confirm({
        text: `Are you sure you want to delete this "${selectedDisposition.vehicle?.assetRefId}" record? `,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        icon: 'question',
        onConfirm: () =>
          deleteDispositionVehicle(selectedDisposition.id).then(() => {
            getDispositionVehicles().then(response => setDispositions(response.data));
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
    getDispositionVehicles().then(response => setDispositions(response.data));
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
        fileName={`Disposition_Vehicles_${moment().format('YYYYMMDDHHmm')}`}
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

export default DispositionVehicles;
