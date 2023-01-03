import {FsxGrid, Loader} from '@app/components/common';
import React, {useRef} from 'react';
import { usePersonnelSummaryForGrid } from '@app/services/hr/personnel.services';
import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import Personnel from '@app/entities/hr/Personnel';
import PersonnelViewOption from './ViewOptions';
import {FsxGridExcelExportRef} from '@app/components/common/FsxGrid';
import {GridColumn} from '@progress/kendo-react-grid';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import {RadialItem} from '@app/store/app/types'; 
import {useHistory} from 'react-router-dom';
import {useRadialMenu} from '@app/hooks/useRadialMenu';

export interface PersonnelProps {}

const PersonnelDetail: React.FC<PersonnelProps> = () => {
    const history = useHistory();
 
    const {data: personnelSummaryForGrid, isLoading, fetchMore} = usePersonnelSummaryForGrid();
    const [selected, setSelected] = React.useState<Personnel>();
    const radialMenu = useRadialMenu({rerenderDelayMS: 100});

    const gridExcelExportRef = useRef<FsxGridExcelExportRef>();

    const handleUpdate = React.useCallback(() => {
        if (selected)
            history.push(`/app/humanresource/personnel/${selected.id}`);
    }, [history, selected]);

    const initialMenu: RadialItem[] = [
        {title: 'View', icon: 'visibility-visible'},
        {title: 'Create', icon: 'add', onClick: () => history.push('/app/humanresource/personnel/new')},
        {title: 'Update', icon: 'edit', onClick: handleUpdate},
        {title: 'Print', icon: 'print'},
        {title: 'Export', icon: 'excel', onClick: () => gridExcelExportRef.current?.excelExport()},
    ];

    React.useEffect(() => {
        radialMenu.generate(initialMenu);
    }, [radialMenu, initialMenu]);

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-shrink mb-4">
                <PersonnelViewOption />
            </div>
            <div className="flex flex-grow">
                {isLoading ? (
                    <Loader /> 
                ) : (
                    <FsxGrid
                        data={personnelSummaryForGrid?.data}
                        onRowClick={(e: any) => {
                            setSelected(e.dataItem);
                        }}
                        onRowDoubleClick={(e: any) => {
                            handleUpdate();
                        }}
                        gridExcelExportRef={{ref: gridExcelExportRef, fileName: 'Personnel Summary'}}
                    >
                        
                        <GridColumn
                            field="personnelNo"
                            title="Personnel ID No."
                            filter={'text'}
                            columnMenu={KGridMenuFilter}
                        />
                        <GridColumn
                            field="assignedIdNo"
                            title="Assigned ID No."
                            filter={'text'}
                            columnMenu={KGridMenuFilter}
                        />
                        <GridColumn
                            field="fullName"
                            title="Full Name"
                            filter={'text'}
                            columnMenu={KGridMenuFilter}
                        />
                        <GridColumn
                            field="humanResourceCategory.title"
                            title="Category"
                            filter={'text'}
                            columnMenu={KGridMenuFilter}
                        />
                        <GridColumn
                            field="humanResourceStatus.title"
                            title="Status"
                            filter={'text'}
                            columnMenu={KGridMenuFilter}
                        />
                        <GridColumn
                            field="nationality.title"
                            title="Nationality"
                            filter={'text'}
                            columnMenu={KGridMenuFilter}
                        />
                        <GridColumn
                            field="humanResourceDepartment.title"
                            title="Department"
                            filter={'text'}
                            columnMenu={KGridMenuFilter}
                        />
                        <GridColumn
                            field="humanResourcePosition.title"
                            title="Position"
                            filter={'text'}
                            columnMenu={KGridMenuFilter}
                        />
                        <GridColumn
                            field="birthdate"
                            title="Age"
                            filter={'text'}
                            columnMenu={KGridMenuFilter}
                        />
                        <GridColumn
                            field="assignedEmail"
                            title="Assigned Email"
                            filter={'text'}
                            columnMenu={KGridMenuFilter}
                        />
                        <GridColumn
                            field="chatId"
                            title="Chat ID"
                            filter={'text'}
                            columnMenu={KGridMenuFilter}
                        />
                    </FsxGrid>
                )}
            </div>
        </div>
    );
};

export default React.memo(PersonnelDetail);
