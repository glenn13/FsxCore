import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import uri from '@app/helpers/endpoints';
import { useStatus, KEY } from '@app/services/hr/standardentries/status.service';
import {FormikProps} from 'formik';
import Status, { newStatus } from '@app/entities/hr/standard-entries/Status';
import { useStandardEntry } from '../../useStandardEntry';
import StandardEntryForm from '../StandardEntryForm';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';

export interface IStatusEntryProps {}

const StatusEntry: React.FC<IStatusEntryProps> = () => {
    const {data, isLoading} = useStatus();
    const fsxGridRef = React.useRef<any>(null);
    const formikRef = React.useRef<FormikProps<any>>(null);
    const URI = uri.hr.SE.status.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newStatus());
    }, []); 
 
    const handleEdit = React.useCallback(() => {}, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<Status>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Status" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
            {isLoading && <Loader />}
            {!isLoading && (
                <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
                    <GridColumn field="title" title="title" filter={'text'} columnMenu={KGridMenuFilter} />
                </FsxGrid> 
            )}
        </>
    );
}

export default StatusEntry;