import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import uri from '@app/helpers/endpoints';
import { useJobCodes, KEY } from '@app/services/hr/standardentries/jobcodes.service';
import {FormikProps} from 'formik';
import  JobCode, { newJobCode } from '@app/entities/hr/standard-entries/JobCode';
import { useStandardEntry } from '../../useStandardEntry';
import StandardEntryForm from '../StandardEntryForm';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';

export interface IJobCodeEntryProps {}

const JobCodeEntry: React.FC<IJobCodeEntryProps> = () => {
    const {data, isLoading} = useJobCodes();
    const fsxGridRef = React.useRef<any>(null);
    const formikRef = React.useRef<FormikProps<any>>(null);
    const URI = uri.hr.SE.jobcodes.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newJobCode());
    }, []);

    const handleEdit = React.useCallback(() => {}, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<JobCode>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Job Code" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
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

export default JobCodeEntry;