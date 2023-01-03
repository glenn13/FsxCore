import React, {useRef} from 'react';
import _ from 'lodash';
import {RadialItem} from '@app/store/app/types';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {StoreDispatch} from '@app/store/rootReducer';
import {
  Confirm,
  FsxTable, 
  Toast} from '@app/components/common';
import {GridColumn} from '@app/helpers/types';
import {submitGeneralAssetItemGroupSearchCriteria} from '@app/store/asset/register/generalasset.actions';
import {
  useGeneralAssetItemGroupsForGrid,
  deleteGeneralAsset,
  getGeneralAssetTransactionHistory,
} from '@app/services/asset/register/generalasset.service';
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

export interface GeneralAssetTabProps {
  radialItems: (value: RadialItem[]) => void;
}

const columnsItemGroup: GridColumn[] = [
  {field: 'referenceNo', title: 'Group Id'},
  {field: 'assetGroupName', title: 'Group Name'},
  {field: 'assetItemName', title: 'Item Name'},
  {field: 'totalQty', title: 'Total Qty'},
];

const columnsSecondaryDetails: GridColumn[] = [
  {field: 'flag', title: 'Flag', type: 'checkbox'},
  {field: 'assetStatus', title: 'Asset Status'},
  {field: 'maintenanceStatus', title: 'Maintenance Status'},
  {field: 'assetRefId', title: 'Asset ID'},
  {field: 'manufacturer', title: 'Manufacturer'},
  {field: 'model', title: 'Model'},
  {field: 'unitType', title: 'Unit Type'},
  {field: 'serialNo', title: 'Serial No.'},
  {field: 'description', title: 'Description'},
  {field: 'poNo', title: 'PO No.'},
  {field: 'purchaseDate', title: 'Purchase Date', type: 'date'},
  {field: 'purchasePrice', title: 'Purchase Price', format: '{0:N2}'},
  {field: 'lastServiceDate', title: 'Last Service Date', type: 'date'},
  {field: 'nextServiceDate', title: 'Next Service Date', type: 'date'},
  {field: 'maintenanceCycle', title: 'Maintenance Cycle', type: 'badge'},
];

const GeneralAssetTab: React.FC<GeneralAssetTabProps> = ({radialItems}) => {
  const history = useHistory();
  const dispatch: StoreDispatch = useDispatch();
  const generalAssetItemGroupsForGrid = useGeneralAssetItemGroupsForGrid();
  const [selectedItemGroup, setSelectedItemGroup] = React.useState<GeneralAssetItemGroup>();
  const [generalAssetSecondaryDetailData, setGeneralAssetSecondaryDetailData] = React.useState<GeneralAssetSecondaryDetail[]>();
  const [
    selectedGeneralAssetSecondaryDetail,
    setGeneralAssetSecondaryDetail,
  ] = React.useState<GeneralAssetSecondaryDetail>();

  const [disabledButton, setDisabledButton] = React.useState<boolean>(true);

  const {status} = useSelector((state: RootState) => {
    return {
      status: state.status,
    };
  });

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const excelExportRefS = useRef<any>(null);
  const exportToExcelS = () => excelExportRefS.current?.exportAsExcel();

  const handleView = React.useCallback(() => {
    if (selectedGeneralAssetSecondaryDetail !== undefined) {
      if (hasGeneralAssetView) {
        history.push(
          `/app/asset/register/generalasset/${selectedGeneralAssetSecondaryDetail.generalAssetId}/view`,
        );
      } else {
        dispatch(setStatus('No Permission Access'));
      }
    }
  }, [selectedGeneralAssetSecondaryDetail, history]);

  const handleUpdate = React.useCallback(() => {
    if (selectedGeneralAssetSecondaryDetail !== undefined) {
      if (hasGeneralAssetEdit) {
        history.push(
          `/app/asset/register/generalasset/${selectedGeneralAssetSecondaryDetail.generalAssetId}`,
        );
      } else {
        dispatch(setStatus('No Permission Access'));
      }
    }
  }, [selectedGeneralAssetSecondaryDetail?.generalAssetId, history]);

  const handleWorkOrder = React.useCallback(() => {
    if (selectedGeneralAssetSecondaryDetail !== undefined) {
      history.push(
        `/app/maintenance/workorder/generalasset/${selectedGeneralAssetSecondaryDetail.generalAssetId}/new`,
      );
    }
  }, [selectedGeneralAssetSecondaryDetail, history]);

  const handleDisposition = React.useCallback(() => {
    if (selectedGeneralAssetSecondaryDetail !== undefined) {
      history.push(
        `/app/asset/disposition/generalasset/${selectedGeneralAssetSecondaryDetail.generalAssetId}/new`,
      );
    }
  }, [selectedGeneralAssetSecondaryDetail, history]);
  
  const handleDelete = React.useCallback(() => {
    handleClose();   

    if (selectedGeneralAssetSecondaryDetail !== undefined) {
      if (hasGeneralAssetDelete){
        getGeneralAssetTransactionHistory(selectedGeneralAssetSecondaryDetail?.generalAssetId).then(response => {      
          if (response.data.length != 0) 
            dispatch(setStatus("Asset is currently tagged to a transaction."));
          else {       
            Confirm({
              text: `Are you sure you want to delete "${selectedGeneralAssetSecondaryDetail?.assetRefId}" record? `,
              showCancelButton: true,
              confirmButtonText: "Delete",
              icon: 'question',
              onConfirm: () => {
                deleteGeneralAsset(selectedGeneralAssetSecondaryDetail.generalAssetId).then(() => {
                  generalAssetItemGroupsForGrid.fetchMore();
                  PopulateSecondaryDetails();
                });
              },
            });
          }
        })
      } 
      else dispatch(setStatus("No Permission Access"));
    }
  }, [selectedGeneralAssetSecondaryDetail]);

  const PopulateSecondaryDetails = () => {
    if (selectedItemGroup !== undefined) {
      let _searchCriteria: GeneralAssetItemGroupSearchCriteria = {
        assetGroupId: selectedItemGroup.assetGroupId,
        assetItemNameId: selectedItemGroup.assetItemNameId,
      };

      dispatch(submitGeneralAssetItemGroupSearchCriteria(_searchCriteria))
        .then(response => {
          setGeneralAssetSecondaryDetailData(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      setGeneralAssetSecondaryDetail(undefined);
    }
  };

  const {hasPermission} = usePermissions();
  const hasGeneralAssetNew = hasPermission(AssetRegisterPermission.GeneralAssetNew);
  const hasGeneralAssetView = hasPermission(AssetRegisterPermission.GeneralAssetView);
  const hasGeneralAssetEdit = hasPermission(AssetRegisterPermission.GeneralAssetEdit);
  const hasGeneralAssetDelete = hasPermission(AssetRegisterPermission.GeneralAssetDelete);
  const hasGeneralAssetPrint = hasPermission(AssetRegisterPermission.GeneralAssetPrint);
  const hasGeneralAssetExport = hasPermission(AssetRegisterPermission.GeneralAssetExport);
  const hasGeneralAssetIssueInspection = hasPermission(
    MaintenanceInspectionPermission.GeneralAssetNew,
  );
  const hasGeneralAssetIssueWorkOrder = hasPermission(
    MaintenanceWorkOrderPermission.GeneralAssetNew,
  );
  const hasGeneralAssetFlag = hasPermission(AssetRegisterPermission.GeneralAssetFlag);
  const hasGeneralAssetIssueDisposition = hasPermission(AssetDispositionPermission.GeneralAssetNew);

  const handlePrint = React.useCallback(() => {
    if (!selectedGeneralAssetSecondaryDetail) return;

    StorageService.set('sessionStorage', 'REPORT_ITEM', {
      reportName: 'General Asset Information Sheet',
      AssetId: selectedGeneralAssetSecondaryDetail.generalAssetId,
    });

    history.push(
      `/app/asset/register/generalasset/${selectedGeneralAssetSecondaryDetail.generalAssetId}/report`,
    );
  }, [selectedGeneralAssetSecondaryDetail]);

  const initRadialItems: RadialItem[] = React.useMemo(
    () => [
      {
        title: 'View', 
        icon: 'visibility-visible', 
        disabled: !hasGeneralAssetView || disabledButton,
        onClick: handleView,
      },
      {
        title: 'Create',
        icon: 'add',
        disabled: !hasGeneralAssetNew,
        onClick: () => history.push('/app/asset/register/generalasset/new'),
      },
      {
        title: 'Update',
        icon: 'edit',
        disabled: !hasGeneralAssetEdit || disabledButton,
        onClick: handleUpdate,
      },
      {
        title: 'Delete',
        icon: 'trash',
        disabled: !hasGeneralAssetDelete || disabledButton,
        onClick: handleDelete,
      },
      {
        title: 'Print',
        icon: 'print',
        disabled: !hasGeneralAssetPrint || disabledButton,
        onClick: handlePrint,
      },
      {title: 'Export', icon: 'excel', disabled: !hasGeneralAssetExport || disabledButton},
      {
        title: 'Issue Inspection',
        icon: 'open-task',
        disabled: !hasGeneralAssetIssueInspection || disabledButton,
      },
      {
        title: 'Issue Work Order',
        icon: 'report',
        onClick: handleWorkOrder,
        disabled: !hasGeneralAssetIssueWorkOrder || disabledButton,
      },
      {title: 'Flag Asset', icon: 'flag', disabled: !hasGeneralAssetFlag || disabledButton},
      {
        title: 'Issue Disposition',
        icon: 'asset-disposition',
        onClick: handleDisposition,
        disabled: !hasGeneralAssetIssueDisposition || disabledButton,
      },
    ],
    [
      disabledButton,
      hasGeneralAssetNew,
      hasGeneralAssetView,
      hasGeneralAssetEdit,
      hasGeneralAssetDelete,
      hasGeneralAssetDelete,
      hasGeneralAssetPrint,
      hasGeneralAssetExport,
      hasGeneralAssetIssueInspection,
      hasGeneralAssetIssueWorkOrder,
      hasGeneralAssetFlag,
      selectedGeneralAssetSecondaryDetail
    ],
  );

  // eslint-disable-next-line
  // Init radial items on load
  React.useEffect(() => {
    radialItems(initRadialItems);
  }, [initRadialItems]);

  React.useEffect(() => {
    PopulateSecondaryDetails();
  }, [selectedItemGroup, dispatch]);

  React.useEffect(() => {
    if (selectedGeneralAssetSecondaryDetail !== undefined) {
      setDisabledButton(false);
    }
  }, [selectedGeneralAssetSecondaryDetail]);

  const handleClose = () => dispatch(setStatus(''));

  React.useEffect(() => {
    return () => {
      dispatch(setStatus(''));
    };
  }, [dispatch]);

  return (
    <div>
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
        fileName={`Register_GeneralAssets_${moment().format('YYYYMMDDHHmm')}`}
        data={generalAssetItemGroupsForGrid.data?.data}
        ref={excelExportRef}
        columns={columnsItemGroup}>
        <FsxTable
          data={generalAssetItemGroupsForGrid.data?.data}
          columns={columnsItemGroup}
          onRowClick={e => setSelectedItemGroup(e.dataItem)}>
          <FsxTableActions onExport={exportToExcel} />
        </FsxTable>
      </FsxExcelExport>

      <div className="w-full mb-8" />

      <FsxExcelExport
        fileName={`Register_GeneralAsset_SecondaryDetails_${moment().format('YYYYMMDDHHmm')}`}
        data={generalAssetSecondaryDetailData}
        ref={excelExportRefS}
        columns={columnsSecondaryDetails}>
        <FsxTable
          data={generalAssetSecondaryDetailData}
          columns={columnsSecondaryDetails}
          onRowClick={e => setGeneralAssetSecondaryDetail(e.dataItem)}
          onRowDoubleClick={e => {
            handleUpdate();
          }}>
          <FsxTableActions onExport={exportToExcelS} />
        </FsxTable>
      </FsxExcelExport>
    </div>
  );
};

export default React.memo(GeneralAssetTab);
