import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import uri from '@app/helpers/endpoints';
import { useCustomerTiers, KEY } from '@app/services/crm/standardentries/customerTier.service';
import {FormikProps} from 'formik';
import  CustomerTier, { newCustomerTier } from '@app/entities/crm/standard-entries/CustomerTier';
import { useStandardEntry } from '../../useStandardEntry';
import StandardEntryForm from '../StandardEntryForm';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';

export interface ICustomerTierEntryProps {}

const CustomerTierEntry: React.FC<ICustomerTierEntryProps> = () => {
    const {data, isLoading} = useCustomerTiers();
    const fsxGridRef = React.useRef<any>(null);
    const formikRef = React.useRef<FormikProps<any>>(null);
    const URI = uri.crm.SE.customerTiers.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newCustomerTier());
    }, []);

    const handleEdit = React.useCallback(() => {}, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<CustomerTier>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Customer Tier" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
            {isLoading && <Loader />}
            {!isLoading && (
                <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
                    <GridColumn field="title" title="title" filter={'text'} columnMenu={KGridMenuFilter} />
                </FsxGrid>
            )}
        </>
    );
}

export default CustomerTierEntry;