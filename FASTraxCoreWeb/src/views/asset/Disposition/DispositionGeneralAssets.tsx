import React, {useRef, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {RadialItem} from '@app/store/app/types';
import {FsxTable} from '@app/components/common';
import {useDispositionGeneralAsset} from '@app/hooks/useDispositionGeneralAsset';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';
import DispositionGeneralAsset from '@app/entities/asset/disposition/generalasset/DispositionGeneralAsset';
import {
  getDispositionGeneralAssets,
  deleteDispositionGeneralAsset,
} from '@app/services/asset/disposition/dispositionGeneralAsset.service';
import {Confirm, Toast} from '@app/components/common';
import usePermissions from '@app/hooks/usePermisions';
import {AssetDisposition as AssetDispositionPermission} from '@app/helpers/permissions/action.key';
import {setStatus} from '@app/store/common/status.reducer';
import {RootState} from '../../../store/rootReducer';
import {useDispatch, useSelector} from 'react-redux';

export interface DispositionGeneralAssetsProps {}

const DispositionGeneralAssets: React.FC<DispositionGeneralAssetsProps> = () => {
  const history = useHistory();
  const disposition = useDispositionGeneralAsset({rerenderDelayMS: 100});
  const [dispositions, setDispositions] = React.useState<DispositionGeneralAsset[]>([]);

  const [selectedDisposition, setSelectedDisposition] = React.useState<DispositionGeneralAsset>();

  const dispatch = useDispatch();
  const {status} = useSelector((state: RootState) => {
    return {
      status: state.status,
    };
  });

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const {hasPermission} = usePermissions();
  const hasGeneralAssetNew = hasPermission(AssetDispositionPermission.GeneralAssetNew);
  const hasGeneralAssetView = hasPermission(AssetDispositionPermission.GeneralAssetView);
  const hasGeneralAssetEdit = hasPermission(AssetDispositionPermission.GeneralAssetEdit);
  const hasGeneralAssetDelete = hasPermission(AssetDispositionPermission.GeneralAssetDelete);
  const hasGeneralAssetPrint = hasPermission(AssetDispositionPermission.GeneralAssetPrint);
  const hasGeneralAssetExport = hasPermission(AssetDispositionPermission.GeneralAssetExport);

  React.useEffect(() => {
    const items: RadialItem[] = [
      {
        title: 'View',
        icon: 'visibility-visible',
        disabled: !hasGeneralAssetView || !selectedDisposition,
      },
      {
        title: 'Update',
        icon: 'edit',
        disabled: !hasGeneralAssetEdit || !selectedDisposition,
        onClick: handleUpdate,
      },
      {
        title: 'Delete',
        icon: 'trash',
        disabled: !hasGeneralAssetDelete || !selectedDisposition,
        onClick: handleDelete,
      },
      {title: 'Print', icon: 'print', disabled: !hasGeneralAssetPrint || !selectedDisposition},
      {title: 'Export', icon: 'excel', disabled: !hasGeneralAssetExport || !selectedDisposition},
    ];

    disposition.generateRadialMenu(items);
  }, [
    disposition,
    selectedDisposition,
    hasGeneralAssetNew,
    hasGeneralAssetView,
    hasGeneralAssetEdit,
    hasGeneralAssetDelete,
    hasGeneralAssetDelete,
    hasGeneralAssetPrint,
    hasGeneralAssetExport,
  ]);

  const handleUpdate = React.useCallback(() => {
    if (selectedDisposition !== undefined) {
      if (hasGeneralAssetEdit) {
        history.push(`/app/asset/disposition/generalasset/${selectedDisposition.id}`);
      } else {
        dispatch(setStatus('No Permission Access'));
      }
    }
  }, [selectedDisposition, history]);

  const handleDelete = React.useCallback(() => {
    if (selectedDisposition !== undefined) {
      Confirm({
        text: `Are you sure you want to delete this "${selectedDisposition.generalAsset?.assetRefId}" record? `,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        icon: 'question',
        onConfirm: () =>
          deleteDispositionGeneralAsset(selectedDisposition.id).then(() => {
            getDispositionGeneralAssets().then(response => setDispositions(response.data));
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
    getDispositionGeneralAssets().then(response => setDispositions(response.data));
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
        fileName={`Disposition_GeneralAssets_${moment().format('YYYYMMDDHHmm')}`}
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

export default DispositionGeneralAssets;
