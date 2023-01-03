import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import uri from '@app/helpers/endpoints';
import { useNationalities, KEY } from '@app/services/hr/standardentries/nationality.service';
import {FormikProps} from 'formik';
import  Nationality, { newNationality } from '@app/entities/hr/standard-entries/Nationality';
import { useStandardEntry } from '../../useStandardEntry';
import StandardEntryForm from '../StandardEntryForm';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';

export interface INationalityEntryProps {}

const NationalityEntry: React.FC<INationalityEntryProps> = () => {
    const {data, isLoading} = useNationalities();
    const fsxGridRef = React.useRef<any>(null);
    const formikRef = React.useRef<FormikProps<any>>(null);
    const URI = uri.hr.SE.nationalities.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newNationality());
    }, []);

    const handleEdit = React.useCallback(() => {}, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<Nationality>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Nationality" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
            {isLoading && <Loader />}
            {!isLoading && (
                <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
                    <GridColumn field="title" title="title" filter={'text'} columnMenu={KGridMenuFilter} />
                </FsxGrid>
            )}
        </>
    );
}

export default NationalityEntry;