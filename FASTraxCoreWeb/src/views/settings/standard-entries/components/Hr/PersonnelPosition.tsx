import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import uri from '@app/helpers/endpoints';
import {usePersonnelPositions, KEY} from '@app/services/hr/standardentries/personnelpositions.service';
import {FormikProps} from 'formik';
import PersonnelPosition, { newPersonnelPosition } from '@app/entities/hr/standard-entries/PersonnelPosition';
import {useStandardEntry} from '../../useStandardEntry';
import StandardEntryForm from '../StandardEntryForm';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';

export interface IPersonnelPositionEntryProps {}

const PersonnelPositionEntry: React.FC<IPersonnelPositionEntryProps> = () => {
    const {data, isLoading} = usePersonnelPositions();
    const fsxGridRef = React.useRef<any>(null);
    const formikRef = React.useRef<FormikProps<any>>(null);
    const URI = uri.hr.SE.personnelpositions.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newPersonnelPosition());
    }, []);

    const handleEdit = React.useCallback(() => {}, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<PersonnelPosition>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Personnel Position" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
            {isLoading && <Loader />}
            {!isLoading && (
                <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
                    <GridColumn field="title" title="title" filter={'text'} columnMenu={KGridMenuFilter} />
                </FsxGrid>
            )}
        </>
    );
}

export default PersonnelPositionEntry;