import React from 'react';
import { FsxGrid, Loader } from '@app/components/common';
import { GridColumn } from '@progress/kendo-react-grid';
import { useStockConditions, KEY } from '@app/services/stock/standardentries/stockCondition.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import StandardEntryForm from '../StandardEntryForm';
import { FormikProps } from 'formik';
import uri from '@app/helpers/endpoints';
import { useStandardEntry } from '../../useStandardEntry';
import { StockCondition, newStockCondition } from '@app/entities/stock/standard-entries/StockCondition';

export interface IStockConditionEntryProps { }

const StockConditionEntry: React.FC<IStockConditionEntryProps> = () => {
    const { data, isLoading } = useStockConditions();
    const formikRef = React.useRef<FormikProps<any>>(null);
    const fsxGridRef = React.useRef<any>(null);
    const URI = uri.stock.SE.stockCondition.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newStockCondition());
    }, []);

    const handleEdit = React.useCallback(() => { }, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<StockCondition>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Stock Condition" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
            {isLoading && <Loader />}
            {!isLoading && data && data.data && (
                <FsxGrid gridRef={fsxGridRef} data={data.data as any} className="h-full" skip={0}>
                    <GridColumn field="code" title="Code" filter={'text'} columnMenu={KGridMenuFilter} />
                    <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
                    <GridColumn field="remarks" title="Remarks" filter={'text'} columnMenu={KGridMenuFilter} />
                </FsxGrid>
            )}
        </>
    );
};

export default StockConditionEntry;