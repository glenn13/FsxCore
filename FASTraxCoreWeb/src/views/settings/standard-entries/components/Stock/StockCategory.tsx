import React from 'react';
import { FsxGrid, Loader } from '@app/components/common';
import { GridColumn } from '@progress/kendo-react-grid';
import { useStockCategories, KEY } from '@app/services/stock/standardentries/stockCategory.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import StandardEntryForm from '../StandardEntryForm';
import { FormikProps } from 'formik';
import uri from '@app/helpers/endpoints';
import { useStandardEntry } from '../../useStandardEntry';
import { StockCategory, newStockCategory } from '@app/entities/stock/standard-entries/StockCategory';

export interface IStockCategoryEntryProps { }

const StockCategoryEntry: React.FC<IStockCategoryEntryProps> = () => {
  const { data, isLoading } = useStockCategories();
  const formikRef = React.useRef<FormikProps<any>>(null);
  const fsxGridRef = React.useRef<any>(null);
  const URI = uri.stock.SE.stockCategory.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newStockCategory());
  }, []);

  const handleEdit = React.useCallback(() => { }, []);

  const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<StockCategory>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Stock Category" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
      {isLoading && <Loader />}
      {!isLoading && data && data.data && (
        <FsxGrid gridRef={fsxGridRef} data={data.data as any} className="h-full" skip={0}>
          <GridColumn field="code" title="Code" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default StockCategoryEntry;