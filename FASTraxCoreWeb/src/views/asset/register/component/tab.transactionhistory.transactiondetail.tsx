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
import { getComponentTransactionHistory } from '@app/services/asset/register/component.service';
import { deleteDispositionComponent } from '@app/services/asset/disposition/dispositionComponent.service';
import { deleteEstimateComponent, GetURIEstimatePageForView } from '@app/services/maintenance/estimate.service';
import { deleteInspectionComponent, GetURIInspectionPageForView } from '@app/services/maintenance/inspection.service';
import { deleteWorkOrderComponent, GetURIWorkOrderPageForView } from '@app/services/maintenance/workorder.service';

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
    const formik = useFormikContext<Component>();
    const {hasPermission} = usePermissions();
    const {isOpen, onToggle} = useDisclosure({});
    const [status, setStatus] = useState<StatusAlert>({message: "", title: ""});
    const [componentTransactions, setComponentTransactions] = useState<RegisterTransactionHistory[]>([]);
    const [selected, setSelected] = useState<RegisterTransactionHistory>();
    
    const PopulateTransactionHistory = () => {
        getComponentTransactionHistory(formik.values.id).then(response => {  
            response.data.forEach(d => d.uri = uri(d.transactionHistoryTypeId, d.id));          
            setComponentTransactions(response.data)
        })
    }
    
    const permissions:any[] = [
        { type: TransactionHistoryTypeEnum.Disposition, permission: [ {event: "view"    , access: hasPermission(AssetDispositionPermission.ComponentView)}, 
                                                                      {event: "delete"  , access: hasPermission(AssetDispositionPermission.ComponentDelete)} ]},
        { type: TransactionHistoryTypeEnum.Estimate,    permission: [ {event: "view"    , access: hasPermission(MaintenanceEstimate.ComponentView)}, 
                                                                      {event: "delete"  , access: hasPermission(MaintenanceEstimate.ComponentDelete)} ]},
        { type: TransactionHistoryTypeEnum.Inspection,  permission: [ {event: "view"    , access: hasPermission(MaintenanceInspection.ComponentView)}, 
                                                                      {event: "delete"  , access: hasPermission(MaintenanceInspection.ComponentDelete)} ]},
        { type: TransactionHistoryTypeEnum.WorkOrder,   permission: [ {event: "view"    , access: hasPermission(MaintenanceWorkOrder.ComponentView)}, 
                                                                      {event: "delete"  , access: hasPermission(MaintenanceWorkOrder.ComponentDelete)} ]},
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
                _uri = GetURIDispositionPageForView(AssetCategoryEnum.Component, id)
                break;
            case(TransactionHistoryTypeEnum.Estimate): 
                _uri = GetURIEstimatePageForView(AssetCategoryEnum.Component, id); 
                break;
            case(TransactionHistoryTypeEnum.Inspection): 
                _uri = GetURIInspectionPageForView(AssetCategoryEnum.Component, id); 
                break;
            case(TransactionHistoryTypeEnum.WorkOrder): 
                _uri = GetURIWorkOrderPageForView(AssetCategoryEnum.Component, id); 
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
                            switch(selected?.transactionHistoryTypeId) {
                                case (TransactionHistoryTypeEnum.Disposition): 
                                    deleteDispositionComponent(selected?.id).then(() => PopulateTransactionHistory()); 
                                    break;
                                case (TransactionHistoryTypeEnum.Estimate): 
                                    deleteEstimateComponent(selected?.id ).then(() => PopulateTransactionHistory()); 
                                    break;
                                case (TransactionHistoryTypeEnum.Inspection): 
                                    deleteInspectionComponent(selected?.id).then(() => PopulateTransactionHistory()); 
                                    break;                              
                                case (TransactionHistoryTypeEnum.WorkOrder): 
                                    deleteWorkOrderComponent(selected?.id).then(() => PopulateTransactionHistory()); 
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
        if (componentTransactions.length != 0)
            excelExportRef.current?.exportAsExcel();        
    }

    React.useEffect(() => { PopulateTransactionHistory(); }, []);

    return(
        <>
            <div className="p-2">                
                <FsxExcelExport
                    fileName={`Register_Component_TransactionHistory_${moment().format('YYYYMMDDHHmm')}`}
                    data={componentTransactions}
                    ref={excelExportRef}
                    columns={columns}>      
                    <FsxTable
                        data={componentTransactions}
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