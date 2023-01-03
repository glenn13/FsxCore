import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import uri from '@app/helpers/endpoints';
import { useFinanceAccountTypes, KEY} from '@app/services/finance/standardentries/financeAccountType.service';
import { FormikProps } from 'formik';
import FinanceAccountType, {newFinanceAccountType} from '@app/entities/finance/standard-entries/FinanceAccountType';
import { useStandardEntry } from '../../useStandardEntry';
import StandardEntryForm from '../StandardEntryForm';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';

export interface IFinanceAccountTypeEntryProps {}

const FinanceAccountTypeEntry: React.FC<IFinanceAccountTypeEntryProps> = () => {
    const {data, isLoading} = useFinanceAccountTypes();
    const fsxGridRef = React.useRef<any>(null);
    const formikRef = React.useRef<FormikProps<any>>(null);
    const URI = uri.finance.SE.financeAccountType.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newFinanceAccountType());
    }, []);

    const handleEdit = React.useCallback(() => {}, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<FinanceAccountType>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Finance Account Type" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
                {isLoading && <Loader />}
                {!isLoading && (
                <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
                    <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
                </FsxGrid>
            )}
        </>
    );
}

export default FinanceAccountTypeEntry;