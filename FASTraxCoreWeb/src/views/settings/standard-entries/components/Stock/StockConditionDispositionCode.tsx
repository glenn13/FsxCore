import React from 'react';
import { FsxGrid, Loader } from '@app/components/common';
import { GridColumn } from '@progress/kendo-react-grid';
import { useStockConditionDispositionCodes, KEY } from '@app/services/stock/standardentries/stockConditionDispositionCode.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import StandardEntryForm from '../StandardEntryForm';
import { FormikProps } from 'formik';
import uri from '@app/helpers/endpoints';
import { useStandardEntry } from '../../useStandardEntry';
import { StockConditionDispositionCode, newStockConditionDispositionCode } from '@app/entities/stock/standard-entries/StockConditionDispositionCode';

export interface IStockConditionDispositionCodeEntryProps { }

const StockConditionDispositionCodeEntry: React.FC<IStockConditionDispositionCodeEntryProps> = () => {
    const { data, isLoading } = useStockConditionDispositionCodes();
    const formikRef = React.useRef<FormikProps<any>>(null);
    const fsxGridRef = React.useRef<any>(null);
    const URI = uri.stock.SE.stockConditionDispositionCode.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newStockConditionDispositionCode());
    }, []);

    const handleEdit = React.useCallback(() => { }, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<StockConditionDispositionCode>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Stock Condition Disposition Code" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
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

export default StockConditionDispositionCodeEntry;