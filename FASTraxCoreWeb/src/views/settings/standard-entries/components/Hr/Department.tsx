import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import uri from '@app/helpers/endpoints';
import { useHumanResourceDepartments, KEY } from '@app/services/hr/standardentries/humanResourceDepartment.service';
import {FormikProps} from 'formik';
import  HumanResourceDepartment, { newHumanResourceDepartment } from '@app/entities/hr/standard-entries/HumanResourceDepartment';
import { useStandardEntry } from '../../useStandardEntry';
import StandardEntryForm from '../StandardEntryForm';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';

export interface IDeparmentEntryProps {}

const DepartmentEntry: React.FC<IDeparmentEntryProps> = () => {
    const {data, isLoading} = useHumanResourceDepartments();
    const fsxGridRef = React.useRef<any>(null);
    const formikRef = React.useRef<FormikProps<any>>(null);
    const URI = uri.hr.SE.departments.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newHumanResourceDepartment());
    }, []);

    const handleEdit = React.useCallback(() => {}, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<HumanResourceDepartment>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Department" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
            {isLoading && <Loader />}
            {!isLoading && (
                <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
                    <GridColumn field="code" title="code" filter={'text'} columnMenu={KGridMenuFilter} /> 
                    <GridColumn field="title" title="title" filter={'text'} columnMenu={KGridMenuFilter} />
                </FsxGrid>
            )}
        </>
    );
}

export default DepartmentEntry;