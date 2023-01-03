import React, { useRef, useState } from 'react';
import useDisclosure from '@app/hooks/useDisclosure';
import usePermissions from '@app/hooks/usePermisions';
import moment from 'moment';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import { useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import { Button } from '@progress/kendo-react-buttons';
import { Confirm, ConfirmDialog, ConfirmDialogBody, ConfirmDialogFooter, FsxTable } from '@app/components/common';
import { GridColumn } from '@app/helpers/types';
import { AssetDisposition as AssetDispositionPermission, 
    MaintenanceEstimate, 
    MaintenanceInspection, 
    MaintenanceWorkOrder
} from '@app/helpers/permissions/action.key';
import { AssetCategoryEnum, TransactionHistoryTypeEnum } from '@app/helpers/asset/enum';
import { GetURIDispositionPageForView } from '@app/services/asset/disposition/disposition.service';
import { getVehicleTransactionHistory } from '@app/services/asset/register/vehicle.service';
import { deleteDispositionVehicle } from '@app/services/asset/disposition/dispositionVehicle.service';
import { deleteEstimateVehicle, GetURIEstimatePageForView } from '@app/services/maintenance/estimate.service';
import { deleteInspectionVehicle, GetURIInspectionPageForView } from '@app/services/maintenance/inspection.service';
import { deleteWorkOrderVehicle, GetURIWorkOrderPageForView } from '@app/services/maintenance/workorder.service';
import FsxTableAction from '@app/components/common/FsxTable/Action';

export interface TransactionDetailProps {
    isReadOnly: boolean;
}

const columns: GridColumn[] = [
    {field: 'transactionHistoryType', title: 'Type'},
    {field: 'referenceNo', title: 'Reference No.'},
    {field: 'status', title: 'Status'},
    {field: 'transactionDetails', title: 'Transaction Details'},
    {field: 'createdBy', title: 'Created By'},
    {field: 'issuedDate', title: 'Issued Date', type: 'date'},
    {field: 'dateClosed', title: 'Date Closed', type: 'date'},
];

const statuses = [
    { status: "approved"}, 
    { status: "closed"}, 
    { status: "final"}
];

interface StatusAlert {
    message: string;
    title: string;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({isReadOnly}) => {
    const history = useHistory();
    const formik = useFormikContext<Vehicle>();
    const {hasPermission} = usePermissions();
    const {isOpen, onToggle} = useDisclosure({});
    const [status, setStatus] = useState<StatusAlert>({message: "", title: ""});
    const [vehicleTransactions, setVehicleTransactions] = useState<RegisterTransactionHistory[]>([]);
    const [selected, setSelected] = useState<RegisterTransactionHistory>();
    
    const PopulateTransactionHistory = () => {
        getVehicleTransactionHistory(formik.values.id).then(response => {    
            response.data.forEach(d => d.uri = uri(d.transactionHistoryTypeId, d.id));        
            setVehicleTransactions(response.data)
        })
    }
    
    const permissions:any[] = [
        { type: TransactionHistoryTypeEnum.Disposition, permission: [ {event: "view"    , access: hasPermission(AssetDispositionPermission.VehicleView)}, 
                                                                      {event: "delete"  , access: hasPermission(AssetDispositionPermission.VehicleDelete)} ]},
        { type: TransactionHistoryTypeEnum.Estimate,    permission: [ {event: "view"    , access: hasPermission(MaintenanceEstimate.VehicleView)}, 
                                                                      {event: "delete"  , access: hasPermission(MaintenanceEstimate.VehicleDelete)} ]},
        { type: TransactionHistoryTypeEnum.Inspection,  permission: [ {event: "view"    , access: hasPermission(MaintenanceInspection.VehicleView)}, 
                                                                      {event: "delete"  , access: hasPermission(MaintenanceInspection.VehicleDelete)} ]},
        { type: TransactionHistoryTypeEnum.WorkOrder,   permission: [ {event: "view"    , access: hasPermission(MaintenanceWorkOrder.VehicleView)}, 
                                                                      {event: "delete"  , access: hasPermission(MaintenanceWorkOrder.VehicleDelete)} ]},
    ]

    const hasViewPermission = (id:number) => {
        var result = permissions.map( (p) => p.type == id && 
        p.permission.find( (x: { event: string; }) => x.event === "view" ));

        return result;
    }
    
    const hasDeletePermission = permissions.map( (p) => p.type == selected?.transactionHistoryTypeId && p.permission.find( (x: { event: string; }) => x.event === "delete" ));

    const uri = (transactionHistoryTypeId:number, id:number) => {
        var _uri = "";

        switch(transactionHistoryTypeId)
        {
            case(TransactionHistoryTypeEnum.Disposition): 
                _uri = GetURIDispositionPageForView(AssetCategoryEnum.Vehicle, id)
                break;
            case(TransactionHistoryTypeEnum.Estimate): 
                _uri = GetURIEstimatePageForView(AssetCategoryEnum.Vehicle, id); 
                break;
            case(TransactionHistoryTypeEnum.Inspection): 
                _uri = GetURIInspectionPageForView(AssetCategoryEnum.Vehicle, id); 
                break;
            case(TransactionHistoryTypeEnum.WorkOrder): 
                _uri = GetURIWorkOrderPageForView(AssetCategoryEnum.Vehicle, id); 
                break;
        }
        return _uri;
    };  

    const handleView = React.useCallback(() => {
        if (selected !== undefined) {
            if (hasViewPermission(selected?.transactionHistoryTypeId)[selected?.transactionHistoryTypeId - 1].access)
                history.push(uri(selected?.transactionHistoryTypeId, selected?.id));
            else { 
                setStatus({message: "You do not have permission to view this transaction.", title: "Access denied"});  
                onToggle(); 
            }
        }
      }, [selected, history]);

    const handleDelete = React.useCallback(() => {
        if (selected !== undefined) {
            if (statuses?.find( (s) => s.status === selected?.status?.toLowerCase())) { 
                setStatus({message: `Transaction is already ${ selected?.status.toLowerCase() }.`, title: "Unable to delete"}); 
                onToggle(); 
            }
            else {            
                if (hasDeletePermission[selected?.transactionHistoryTypeId - 1].access)
                {
                    Confirm({
                        text: `Are you sure you want to delete this "${selected?.referenceNo}" record? `,
                        showCancelButton: true,
                        confirmButtonText: `Delete ${selected?.transactionHistoryType.toLowerCase()}`,
                        icon: 'question',
                        onConfirm: () => {
                            debugger;
                            switch(selected?.transactionHistoryTypeId) {
                                case (TransactionHistoryTypeEnum.Disposition): 
                                    deleteDispositionVehicle(selected?.id).then(() => PopulateTransactionHistory()); 
                                    break;
                                case (TransactionHistoryTypeEnum.Estimate): 
                                    deleteEstimateVehicle(selected?.id ).then(() => PopulateTransactionHistory()); 
                                    break;
                                case (TransactionHistoryTypeEnum.Inspection): 
                                    deleteInspectionVehicle(selected?.id).then(() => PopulateTransactionHistory()); 
                                    break;                              
                                case (TransactionHistoryTypeEnum.WorkOrder): 
                                    deleteWorkOrderVehicle(selected?.id).then(() => PopulateTransactionHistory()); 
                                    break;                             
                            }
                        },
                    });
                }
                else { 
                    setStatus({message: "You do not have permission to delete this transaction.", title: "Access denied"}); 
                    onToggle(); 
                }
            }
        }
    }, [selected, hasDeletePermission, selected?.status]);

    const excelExportRef = useRef<any>(null);
    const handleExport = () => {
        if (vehicleTransactions.length != 0)
            excelExportRef.current?.exportAsExcel();        
    }

    React.useEffect(() => { PopulateTransactionHistory(); }, []);

    return(
        <>
            <div className="p-2">                
                <FsxExcelExport
                    fileName={`Register_Vehicle_TransactionHistory_${moment().format('YYYYMMDDHHmm')}`}
                    data={vehicleTransactions}
                    ref={excelExportRef}
                    columns={columns}>      
                    <FsxTable
                        data={vehicleTransactions}
                        columns={columns}
                        onRowClick={e => setSelected(e.dataItem)}
                        onRowDoubleClick={handleView}>     
                        <FsxTableActions
                            onView={handleView}
                            onDelete={handleDelete}
                            onExport={handleExport}
                            isReadOnly={isReadOnly} />
                    </FsxTable>
                </FsxExcelExport>
            </div>              

            <ConfirmDialog isOpen={isOpen} type="danger" title={status.title}>
                <ConfirmDialogBody>
                    <p> {status.message} </p>
                </ConfirmDialogBody>
                <ConfirmDialogFooter>
                    <Button
                    onClick={onToggle}
                    primary>
                    &nbsp;Ok &nbsp;
                    </Button>
                </ConfirmDialogFooter>
            </ConfirmDialog>
        </>   
    );
};

export default React.memo(TransactionDetail);