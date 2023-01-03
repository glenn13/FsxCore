import React, {useRef} from 'react';
import {RadialItem} from '@app/store/app/types';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {StoreDispatch} from '@app/store/rootReducer';
import {
  Confirm,
  FsxTable, 
  Toast} from '@app/components/common';
import {GridColumn} from '@app/helpers/types';
import {
  useVehicleSummaryForGrid,
  deleteVehicle,
  getVehicleTransactionHistory,
} from '@app/services/asset/register/vehicle.service';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';
import StorageService from '@app/services/storage.service';
import usePermissions from '@app/hooks/usePermisions';
import {
  AssetRegister as AssetRegisterPermission,
  MaintenanceInspection as MaintenanceInspectionPermission,
  AssetDisposition as AssetDispositionPermission,
  MaintenanceWorkOrder as MaintenanceWorkOrderPermission,
} from '@app/helpers/permissions/action.key';
import {setStatus} from '@app/store/common/status.reducer';
import {RootState} from '../../../store/rootReducer';
import useDisclosure from '@app/hooks/useDisclosure';
export interface VehicleTabProps {
  radialItems: (value: RadialItem[]) => void;
}

const columns: GridColumn[] = [
  {field: 'flag', title: 'Flag', type: 'checkbox'},
  {field: 'assetStatus', title: 'Asset Status'},
  {field: 'maintenanceStatus', title: 'Maintenance Status'},
  {field: 'assetRefId', title: 'Asset ID'},
  {field: 'vin', title: 'Serial No.'},
  {field: 'assetType', title: 'Type'},
  {field: 'assetManufacturer', title: 'Manufacturer'},
  {field: 'assetModel', title: 'Model'},
  {field: 'assetModelYear', title: 'Year', type: 'year'},
  {field: 'assetColor', title: 'Color'},
  {field: 'meterType', title: 'Meter Type'},
  {field: 'lastOdometerReading', title: 'Odometer Reading'},
  {field: 'lastServiceDate', title: 'Last Service Date', type: 'date'},
  {field: 'nextServiceDate', title: 'Next Service Date', type: 'date'},
  {field: 'maintenanceCycle', title: 'Maintenance Cycle', type: 'badge'},
];

const VehicleTab: React.FC<VehicleTabProps> = ({radialItems}) => {
  const history = useHistory();
  const dispatch: StoreDispatch = useDispatch();
  const vehicleSummaryForGrid = useVehicleSummaryForGrid();
  const [selectedVehicle, setSelectedVehicle] = React.useState<VehicleSummary>();
  const [disabledButton, setDisabledButton] = React.useState<boolean>(true);
  const {isOpen, onToggle} = useDisclosure({});

  const {status} = useSelector((state: RootState) => {
    return {
      status: state.status,
    };
  });

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleView = React.useCallback(() => {
    if (selectedVehicle !== undefined) {
      if (hasVehicleView) {
        history.push(`/app/asset/register/vehicle/${selectedVehicle.id}/view`);
      } else {
        dispatch(setStatus('No Permission Access'));
      }
    }
  }, [selectedVehicle, history]);

  const handleUpdate = React.useCallback(() => {
    if (selectedVehicle !== undefined) {
      if (hasVehicleEdit) {
        history.push(`/app/asset/register/vehicle/${selectedVehicle.id}`);
      } else {
        dispatch(setStatus('No Permission Access'));
      }
    }
  }, [selectedVehicle, history]);

  const handleWorkOrder = React.useCallback(() => {
    if (selectedVehicle !== undefined) {
      history.push(`/app/maintenance/workorder/vehicle/${selectedVehicle.id}/new`);
    }
  }, [selectedVehicle, history]);

  const handleDisposition = React.useCallback(() => {
    if (selectedVehicle !== undefined) {
      history.push(`/app/asset/disposition/vehicle/${selectedVehicle.id}/new`);
    }
  }, [selectedVehicle, history]);
  
  const handleDelete = React.useCallback(() => {
    handleClose();

    if (selectedVehicle !== undefined) {
      if (hasVehicleDelete){
        getVehicleTransactionHistory(selectedVehicle?.id).then(response => {      
          if (response.data.length != 0) 
            dispatch(setStatus("Asset is currently tagged to a transaction."));
          else {       
            Confirm({
              text: `Are you sure you want to delete "${selectedVehicle?.assetRefId}" record? `,
              showCancelButton: true,
              confirmButtonText: "Delete",
              icon: 'question',
              onConfirm: () => {
                deleteVehicle(selectedVehicle.id).then(() => {
                  vehicleSummaryForGrid.fetchMore();
                });
              },
            });
          }
        })
      } 
      else dispatch(setStatus("No Permission Access"));
    }
  }, [selectedVehicle]);

  const {hasPermission} = usePermissions();
  const hasVehicleNew = hasPermission(AssetRegisterPermission.VehicleNew);
  const hasVehicleView = hasPermission(AssetRegisterPermission.VehicleView);
  const hasVehicleEdit = hasPermission(AssetRegisterPermission.VehicleEdit);
  const hasVehicleDelete = hasPermission(AssetRegisterPermission.VehicleDelete);
  const hasVehiclePrint = hasPermission(AssetRegisterPermission.VehiclePrint);
  const hasVehicleExport = hasPermission(AssetRegisterPermission.VehicleExport);
  const hasVehicleIssueInspection = hasPermission(MaintenanceInspectionPermission.VehicleNew);
  const hasVehicleIssueWorkOrder = hasPermission(MaintenanceWorkOrderPermission.VehicleNew);
  const hasVehicleFlag = hasPermission(AssetRegisterPermission.VehicleFlag);
  const hasVehicleIssueDisposition = hasPermission(AssetDispositionPermission.VehicleNew);

  const handlePrint = React.useCallback(() => {
    if (!selectedVehicle) return;

    StorageService.set('sessionStorage', 'REPORT_ITEM', {
      reportName: 'Vehicle Information Sheet',
      AssetId: selectedVehicle.id,
    });

    history.push(`/app/asset/register/generalasset/${selectedVehicle.id}/report`);
  }, [selectedVehicle]);

  const initRadialItems: RadialItem[] = React.useMemo(
    () => [
      {
        title: 'View', 
        icon: 'visibility-visible', 
        disabled: !hasVehicleView || disabledButton,
        onClick: handleView,
      },
      {
        title: 'Create',
        icon: 'add',
        disabled: !hasVehicleNew,
        onClick: () => history.push('/app/asset/register/vehicle/new'),
      },
      {
        title: 'Update',
        icon: 'edit',
        disabled: !hasVehicleEdit || disabledButton,
        onClick: handleUpdate,
      },
      {
        title: 'Delete',
        icon: 'trash',
        disabled: !hasVehicleDelete || disabledButton,
        onClick: handleDelete,
      },
      {
        title: 'Print',
        icon: 'print',
        disabled: !hasVehiclePrint || disabledButton,
        onClick: handlePrint,
      },
      {title: 'Export', icon: 'excel', disabled: !hasVehicleExport || disabledButton},
      {
        title: 'Issue Inspection',
        icon: 'open-task',
        disabled: !hasVehicleIssueInspection || disabledButton,
      },
      {
        title: 'Issue Work Order',
        icon: 'report',
        onClick: handleWorkOrder,
        disabled: !hasVehicleIssueWorkOrder || disabledButton,
      },
      {title: 'Flag Asset', icon: 'flag', disabled: !hasVehicleFlag || disabledButton},
      {
        title: 'Issue Disposition',
        icon: 'asset-disposition',
        onClick: handleDisposition,
        disabled: !hasVehicleIssueDisposition || disabledButton,
      },
    ],
    [
      disabledButton,
      hasVehicleNew,
      hasVehicleView,
      hasVehicleEdit,
      hasVehicleDelete,
      hasVehicleDelete,
      hasVehiclePrint,
      hasVehicleExport,
      hasVehicleIssueInspection,
      hasVehicleIssueWorkOrder,
      hasVehicleFlag,
      selectedVehicle
    ],
  );

  // eslint-disable-next-line
  // Init radial items on load
  React.useEffect(() => {
    radialItems(initRadialItems);
  }, [initRadialItems]);

  React.useEffect(() => {
    if (selectedVehicle !== undefined) {
      setDisabledButton(false);
    }
  }, [selectedVehicle]);

  React.useEffect(() => {
    radialItems(initRadialItems);
  }, [disabledButton]);

  const handleClose = () => dispatch(setStatus(''));

  React.useEffect(() => {
    return () => {
      dispatch(setStatus(''));
    };
  }, [dispatch]);

  return (
    <div className="m-2">
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
        fileName={`Register_Vehicles_${moment().format('YYYYMMDDHHmm')}`}
        data={vehicleSummaryForGrid.data?.data}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={vehicleSummaryForGrid.data?.data}
          columns={columns}
          onRowClick={e => setSelectedVehicle(e.dataItem)}
          onRowDoubleClick={e => {
            handleUpdate();
          }}>
          <FsxTableActions onExport={exportToExcel} />
        </FsxTable>
      </FsxExcelExport>
    </div>
  );
};

export default React.memo(VehicleTab);
