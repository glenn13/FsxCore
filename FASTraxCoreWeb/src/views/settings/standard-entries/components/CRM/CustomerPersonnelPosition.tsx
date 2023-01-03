import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import uri from '@app/helpers/endpoints';
import { useCustomerPersonnelPositions, KEY } from '@app/services/crm/standardentries/customerPersonnelPosition';
import {FormikProps} from 'formik';
import  CustomerPersonnelPosition, { newCustomerPersonnelPosition } from '@app/entities/crm/standard-entries/CustomerPersonnelPosition';
import { useStandardEntry } from '../../useStandardEntry';
import StandardEntryForm from '../StandardEntryForm';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';

export interface ICustomerPersonnelPositionEntryProps {}

const CustomerPersonnelPositionEntry: React.FC<ICustomerPersonnelPositionEntryProps> = () => {
    const {data, isLoading} = useCustomerPersonnelPositions();
    const fsxGridRef = React.useRef<any>(null);
    const formikRef = React.useRef<FormikProps<any>>(null);
    const URI = uri.crm.SE.customerPersonnelPositions.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newCustomerPersonnelPosition());
    }, []);

    const handleEdit = React.useCallback(() => {}, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<CustomerPersonnelPosition>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Customer Personnel Position" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
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

export default CustomerPersonnelPositionEntry;