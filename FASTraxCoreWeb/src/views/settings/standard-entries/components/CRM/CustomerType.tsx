import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import uri from '@app/helpers/endpoints';
import { useCustomerTypes, KEY } from '@app/services/crm/standardentries/customerType.service';
import {FormikProps} from 'formik';
import  CustomerType, { newCustomerType } from '@app/entities/crm/standard-entries/CustomerType';
import { useStandardEntry } from '../../useStandardEntry';
import StandardEntryForm from '../StandardEntryForm';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';

export interface ICustomerTypeEntryProps {}

const CustomerTypeEntry: React.FC<ICustomerTypeEntryProps> = () => {
    const {data, isLoading} = useCustomerTypes();
    const fsxGridRef = React.useRef<any>(null);
    const formikRef = React.useRef<FormikProps<any>>(null);
    const URI = uri.crm.SE.customerTypes.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newCustomerType());
    }, []);

    const handleEdit = React.useCallback(() => {}, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<CustomerType>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Customer Type" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
            {isLoading && <Loader />}
            {!isLoading && (
                <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
                    <GridColumn field="title" title="title" filter={'text'} columnMenu={KGridMenuFilter} />
                </FsxGrid>
            )}
        </>
    );
}

export default CustomerTypeEntry;