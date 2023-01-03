import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import uri from '@app/helpers/endpoints';
import {useFinanceAccountGroups, KEY} from '@app/services/finance/standardentries/financeAccountGroup.service';
import {FormikProps} from 'formik';
import FinanceAccountGroup, {newFinanceAccountGroup} from '@app/entities/finance/standard-entries/FinanceAccountGroup';
import {useStandardEntry} from '../../useStandardEntry';
import StandardEntryForm from '../StandardEntryForm';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';

export interface IFinanceAccountGroupEntryProps {}

const FinanceAccountGroupEntry: React.FC<IFinanceAccountGroupEntryProps> = () => {
    const {data, isLoading} = useFinanceAccountGroups();
    const fsxGridRef = React.useRef<any>(null);
    const formikRef = React.useRef<FormikProps<any>>(null);
    const URI = uri.finance.SE.financeAccountGroup.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newFinanceAccountGroup());
    }, []);

    const handleEdit = React.useCallback(() => {}, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<FinanceAccountGroup>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Finance Account Group" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
                {isLoading && <Loader />}
                {!isLoading && (
                <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
                    <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
                </FsxGrid>
            )}
        </>
    );
};

export default FinanceAccountGroupEntry;
