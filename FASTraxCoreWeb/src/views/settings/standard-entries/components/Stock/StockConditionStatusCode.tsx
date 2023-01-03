import React from 'react';
import { FsxGrid, Loader } from '@app/components/common';
import { GridColumn } from '@progress/kendo-react-grid';
import { useStockConditionStatusCodes, KEY } from '@app/services/stock/standardentries/stockConditionStatusCode.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import StandardEntryForm from '../StandardEntryForm';
import { FormikProps } from 'formik';
import uri from '@app/helpers/endpoints';
import { useStandardEntry } from '../../useStandardEntry';
import { StockConditionStatusCode, newStockConditionStatusCode } from '@app/entities/stock/standard-entries/StockConditionStatusCode';

export interface IStockConditionStatusCodeEntryProps { }

const StockConditionStatusCodeEntry: React.FC<IStockConditionStatusCodeEntryProps> = () => {
    const { data, isLoading } = useStockConditionStatusCodes();
    const formikRef = React.useRef<FormikProps<any>>(null);
    const fsxGridRef = React.useRef<any>(null);
    const URI = uri.stock.SE.stockConditionStatusCode.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newStockConditionStatusCode());
    }, []);

    const handleEdit = React.useCallback(() => { }, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<StockConditionStatusCode>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Stock Condition Status Code" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
            {isLoading && <Loader />}
            {!isLoading && data && data.data && (
                <FsxGrid gridRef={fsxGridRef} data={data.data as any} className="h-full" skip={0}>
                    <GridColumn field="code" title="Code" filter={'text'} columnMenu={KGridMenuFilter} />
                    <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
                    <GridColumn field="description" title="Description" filter={'text'} columnMenu={KGridMenuFilter} />
                    <GridColumn field="remarks" title="Remarks" filter={'text'} columnMenu={KGridMenuFilter} />
                </FsxGrid>
            )}
        </>
    );
};

export default StockConditionStatusCodeEntry;