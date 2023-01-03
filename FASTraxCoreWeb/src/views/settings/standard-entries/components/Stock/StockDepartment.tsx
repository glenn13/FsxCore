import React from 'react';
import { FsxGrid, Loader } from '@app/components/common';
import { GridColumn } from '@progress/kendo-react-grid';
import { useStockDepartments, KEY } from '@app/services/stock/standardentries/stockDepartment.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import StandardEntryForm from '../StandardEntryForm';
import { FormikProps } from 'formik';
import uri from '@app/helpers/endpoints';
import { useStandardEntry } from '../../useStandardEntry';
import { StockDepartment, newStockDepartment } from '@app/entities/stock/standard-entries/StockDepartment';
import { Checkbox } from '@progress/kendo-react-inputs';

export interface IStockDepartmentEntryProps { }

const StockDepartmentEntry: React.FC<IStockDepartmentEntryProps> = () => {
    const { data, isLoading } = useStockDepartments();
    const formikRef = React.useRef<FormikProps<any>>(null);
    const fsxGridRef = React.useRef<any>(null);
    const URI = uri.stock.SE.stockDepartment.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newStockDepartment());
    }, []);

    const handleEdit = React.useCallback(() => { }, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<StockDepartment>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    const cellItemCheckboxTemplate = (props: any) => {
        return (
            <td>
                <Checkbox value={props.dataItem.isChargeable} disabled={true} />
            </td>
        );
    };

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Stock Department" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
            {isLoading && <Loader />}
            {!isLoading && data && data.data && (
                <FsxGrid gridRef={fsxGridRef} data={data.data as any} className="h-full" skip={0}>
                    <GridColumn field="code" title="Code" filter={'text'} columnMenu={KGridMenuFilter} />
                    <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
                    <GridColumn field="isChargeable" title="Chargeable" filter={'text'} columnMenu={KGridMenuFilter} cell={cellItemCheckboxTemplate} />
                </FsxGrid>
            )}
        </>
    );
};

export default StockDepartmentEntry;