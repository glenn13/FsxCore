import {GridColumn as Column, Grid, GridCellProps} from '@progress/kendo-react-grid';
import {
    FsxTable,
    Loader
} from '@app/components/common';
import {Formik, FormikProps, useFormikContext} from 'formik';

import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import {GridColumn} from '@app/helpers/types';
import React, {useState, Suspense, useRef} from 'react';
import Heading from '@app/views/common/Heading';
import moment from 'moment';
import Personnel from '@app/entities/hr/Personnel';
import PersonnelWorkHistory from '@app/entities/hr/PersonnelWorkHistory';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '@app/store/rootReducer';

const WorkHistory = () => {

    const gridRef = React.useRef<Grid>(null);

    const [workHistory, setWorkHistory] = React.useState<PersonnelWorkHistory[]>();

    const excelExportRef = useRef<any>(null);
    const exportToExcel = () => excelExportRef.current?.exportAsExcel();

    const formikPersonnel = useFormikContext<Personnel>();

    
    const personnelWorkHistory = useSelector(
        (state: RootState) => state.personnelWorkHistoryReducer
    );


    React.useEffect(() => {
        setWorkHistory(formikPersonnel.values.personnelWorkHistory);
      }, [formikPersonnel.values.personnelWorkHistory]);


    const columns: GridColumn[] = [
        {field: 'project.title', title: 'Project Name'},
        {field: 'projectSite.title', title: 'Site Location'},
        {field: 'humanResourceDepartment.title', title: 'Department'},
        {field: 'humanResourcePosition.title', title: 'Position'},
        {field: 'fromDate', title: 'Date From'},
        {field: 'toDate', title: 'Date To'},
        {field: 'basicPay', title: 'Received Basic Pay'},
        {field: 'reportingToPersonnel.fullName', title: 'Reporting To'},
    ];
    return (
        <>
            <Heading title="Work History" />
            <div className="m-2">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                    <div className="col-span-4">
                      
                        <FsxExcelExport
                            fileName={`Personnel_Work_History_${moment().format('YYYYMMDDHHmm')}`}
                                data={personnelWorkHistory.current}
                                ref={excelExportRef}
                                columns={columns}
                            >
                                <FsxTable
                                    ref={gridRef}
                                    data={personnelWorkHistory.current}
                                    columns={columns}
                                >
                                    <FsxTableActions
                                    onExport={exportToExcel}
                                />
                            </FsxTable>
                        </FsxExcelExport>
                    </div>
                </div>
            </div>
        </>
    );




};

export default WorkHistory;
