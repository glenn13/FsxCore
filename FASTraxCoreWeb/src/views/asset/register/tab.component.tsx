import React, {useRef} from 'react';
import {RadialItem} from '@app/store/app/types';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {StoreDispatch} from '@app/store/rootReducer';
import {
  Confirm,
  ConfirmDialog, 
  ConfirmDialogBody, 
  ConfirmDialogFooter, 
  FsxTable, 
  Toast} from '@app/components/common';
import {GridColumn} from '@app/helpers/types';
import {
  useComponentSummaryForGrid,
  deleteComponent,
  getComponentTransactionHistory,
} from '@app/services/asset/register/component.service';
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
import { Button } from '@progress/kendo-react-buttons';

export interface ComponentTabProps {
  radialItems: (value: RadialItem[]) => void;
}

const columns: GridColumn[] = [
  {field: 'flag', title: 'Flag', type: 'checkbox'},
  {field: 'assetStatus', title: 'Asset Status'},
  {field: 'maintenanceStatus', title: 'Maintenance Status'},
  {field: 'assetRefId', title: 'Asset ID'},
  {field: 'serialNo', title: 'Identification No.'},
  {field: 'assetType', title: 'Asset Type'},
  {field: 'assetManufacturer', title: 'Manufacturer'},
  {field: 'assetModel', title: 'Model'},
  {field: 'assetModelYear', title: 'Year', type: 'year'},
  {field: 'assetOwnershipType', title: 'Ownership Type'},
  {field: 'assetColor', title: 'Color'},
  {field: 'dateRegistered', title: 'Date Registered', type: 'date'},
  {field: 'lastServiceDate', title: 'Last Service Date', type: 'date'},
  {field: 'nextServiceDate', title: 'Next Service Date', type: 'date'},
  {field: 'maintenanceCycle', title: 'Maintenance Cycle', type: 'badge'},
];

const ComponentTab: React.FC<ComponentTabProps> = ({radialItems}) => {
  const history = useHistory();
  const dispatch: StoreDispatch = useDispatch();
  const componentSummaryForGrid = useComponentSummaryForGrid();
  const [selectedComponent, setSelectedComponent] = React.useState<ComponentSummary>();
  const {isOpen, onToggle} = useDisclosure({});

  const [disabledButton, setDisabledButton] = React.useState<boolean>(true);

  const {status} = useSelector((state: RootState) => {
    return {
      status: state.status,
    };
  });

  const handleView = React.useCallback(() => {
    if (selectedComponent !== undefined) {
      if (hasComponentView) {
        history.push(`/app/asset/register/component/${selectedComponent.id}/view`);
      } else {
        dispatch(setStatus('No Permission Access'));
      }
    }
  }, [selectedComponent, history]);

  const handleUpdate = React.useCallback(() => {
    if (selectedComponent !== undefined) {
      if (hasComponentEdit) {
        history.push(`/app/asset/register/component/${selectedComponent.id}`);
      } else {
        dispatch(setStatus('No Permission Access'));
      }
    }
  }, [selectedComponent, history]);

  const handleWorkOrder = React.useCallback(() => {
    if (selectedComponent !== undefined) {
      history.push(`/app/maintenance/workorder/component/${selectedComponent.id}/new`);
    }
  }, [selectedComponent, history]);

  const handleDisposition = React.useCallback(() => {
    if (selectedComponent !== undefined) {
      history.push(`/app/asset/disposition/component/${selectedComponent.id}/new`);
    }
  }, [selectedComponent, history]);

  const handleDelete = React.useCallback(() => {
    handleClose();
    
    if (selectedComponent !== undefined) {
      if (hasComponentDelete){
        getComponentTransactionHistory(selectedComponent?.id).then(response => {      
          if (response.data.length != 0) 
            dispatch(setStatus("Asset is currently tagged to a transaction."));
          else {       
            Confirm({
              text: `Are you sure you want to delete "${selectedComponent?.assetRefId}" record? `,
              showCancelButton: true,
              confirmButtonText: "Delete",
              icon: 'question',
              onConfirm: () => {
                deleteComponent(selectedComponent.id).then(() => {
                  componentSummaryForGrid.fetchMore();
                });
              },
            });
          }
        })
      } 
      else dispatch(setStatus("No Permission Access"));
    }
  }, [selectedComponent]);

  const {hasPermission} = usePermissions();
  const hasComponentNew = hasPermission(AssetRegisterPermission.ComponentNew);
  const hasComponentView = hasPermission(AssetRegisterPermission.ComponentView);
  const hasComponentEdit = hasPermission(AssetRegisterPermission.ComponentEdit);
  const hasComponentDelete = hasPermission(AssetRegisterPermission.ComponentDelete);
  const hasComponentPrint = hasPermission(AssetRegisterPermission.ComponentPrint);
  const hasComponentExport = hasPermission(AssetRegisterPermission.ComponentExport);
  const hasComponentIssueInspection = hasPermission(MaintenanceInspectionPermission.ComponentNew);
  const hasComponentIssueWorkOrder = hasPermission(MaintenanceWorkOrderPermission.ComponentNew);
  const hasComponentFlag = hasPermission(AssetRegisterPermission.ComponentFlag);
  const hasComponentIssueDisposition = hasPermission(AssetDispositionPermission.ComponentNew);

  const handlePrint = React.useCallback(() => {
    if (!selectedComponent) return;

    StorageService.set('sessionStorage', 'REPORT_ITEM', {
      reportName: 'Component Information Sheet',
      AssetId: selectedComponent.id,
    });

    history.push(`/app/asset/register/generalasset/${selectedComponent.id}/report`);
  }, [selectedComponent]);

  const initRadialItems: RadialItem[] = React.useMemo(
    () => [
      {
        title: 'View', 
        icon: 'visibility-visible', 
        disabled: !hasComponentView || disabledButton,
        onClick: handleView,
      },
      {
        title: 'Create',
        icon: 'add',
        disabled: !hasComponentNew,
        onClick: () => history.push('/app/asset/register/component/new'),
      },
      {
        title: 'Update',
        icon: 'edit',
        disabled: !hasComponentEdit || disabledButton,
        onClick: handleUpdate,
      },
      {
        title: 'Delete',
        icon: 'trash',
        disabled: !hasComponentDelete || disabledButton,
        onClick: handleDelete,
      },
      {
        title: 'Print',
        icon: 'print',
        disabled: !hasComponentPrint || disabledButton,
        onClick: handlePrint,
      },
      {title: 'Export', icon: 'excel', disabled: !hasComponentExport || disabledButton},
      {
        title: 'Issue Inspection',
        icon: 'open-task',
        disabled: !hasComponentIssueInspection || disabledButton,
      },
      {
        title: 'Issue Work Order',
        icon: 'report',
        onClick: handleWorkOrder,
        disabled: !hasComponentIssueWorkOrder || disabledButton,
      },
      {title: 'Flag Asset', icon: 'flag', disabled: !hasComponentFlag || disabledButton},
      {
        title: 'Issue Disposition',
        icon: 'asset-disposition',
        onClick: handleDisposition,
        disabled: !hasComponentIssueDisposition || disabledButton,
      },
    ],
    [
      disabledButton,
      hasComponentNew,
      hasComponentView,
      hasComponentEdit,
      hasComponentDelete,
      hasComponentDelete,
      hasComponentPrint,
      hasComponentExport,
      hasComponentIssueInspection,
      hasComponentIssueWorkOrder,
      hasComponentFlag,
      selectedComponent
    ],
  );

  // eslint-disable-next-line
  // Init radial items on load
  React.useEffect(() => {
    radialItems(initRadialItems);
  }, [initRadialItems]);

  React.useEffect(() => {
    if (selectedComponent !== undefined) {
      setDisabledButton(false);
    }
  }, [selectedComponent]);

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
      <FsxTable
        data={componentSummaryForGrid.data?.data}
        columns={columns}
        onRowClick={e => setSelectedComponent(e.dataItem)}
        onRowDoubleClick={e => {
          handleUpdate();
        }}>
        <></>
      </FsxTable>
    </div>
  );
};

export default React.memo(ComponentTab);
