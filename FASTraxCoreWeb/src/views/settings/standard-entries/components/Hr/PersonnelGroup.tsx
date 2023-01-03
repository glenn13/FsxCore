import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import uri from '@app/helpers/endpoints';
import { usePersonnelGroups, KEY } from '@app/services/hr/standardentries/personnelgroups.service';
import {FormikProps} from 'formik';
import  PersonnelGroup, { newPersonnelGroup } from '@app/entities/hr/standard-entries/PersonnelGroup';
import { useStandardEntry } from '../../useStandardEntry';
import StandardEntryForm from '../StandardEntryForm';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';

export interface IPersonnelGroupEntryProps {}

const PersonnelGroupEntry: React.FC<IPersonnelGroupEntryProps> = () => {
    const {data, isLoading} = usePersonnelGroups();
    const fsxGridRef = React.useRef<any>(null);
    const formikRef = React.useRef<FormikProps<any>>(null);
    const URI = uri.hr.SE.personnelgroups.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newPersonnelGroup());
    }, []);

    const handleEdit = React.useCallback(() => {}, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<PersonnelGroup>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Personnel Group" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
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

export default PersonnelGroupEntry;