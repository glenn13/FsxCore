import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import uri from '@app/helpers/endpoints';
import { useCreditTerms, KEY } from '@app/services/crm/standardentries/creditTerm.service';
import {FormikProps} from 'formik';
import  CreditTerm, { newCreditTerm } from '@app/entities/crm/standard-entries/CreditTerm';
import { useStandardEntry } from '../../useStandardEntry';
import StandardEntryForm from '../StandardEntryForm';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';

export interface ICreditTermEntryProps {}

const CreditTermEntry: React.FC<ICreditTermEntryProps> = () => {
    const {data, isLoading} = useCreditTerms();
    const fsxGridRef = React.useRef<any>(null);
    const formikRef = React.useRef<FormikProps<any>>(null);
    const URI = uri.crm.SE.creditTerms.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newCreditTerm());
    }, []);

    const handleEdit = React.useCallback(() => {}, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<CreditTerm>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Credit Term" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
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

export default CreditTermEntry;