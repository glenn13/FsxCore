import React from 'react';
import { FsxGrid, Loader } from '@app/components/common';
import { GridColumn } from '@progress/kendo-react-grid';
import { useCommodityBrands, KEY } from '@app/services/stock/standardentries/commodityBrand.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import StandardEntryForm from '../StandardEntryForm';
import { FormikProps } from 'formik';
import uri from '@app/helpers/endpoints';
import { useStandardEntry } from '../../useStandardEntry';
import { CommodityBrand, newCommodityBrand } from '@app/entities/stock/standard-entries/CommodityBrand';

export interface ICommodityBrandEntryProps { }

const CommodityBrandEntry: React.FC<ICommodityBrandEntryProps> = () => {
    const { data, isLoading } = useCommodityBrands();
    const formikRef = React.useRef<FormikProps<any>>(null);
    const fsxGridRef = React.useRef<any>(null);
    const URI = uri.stock.SE.commodityBrand.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newCommodityBrand());
    }, []);

    const handleEdit = React.useCallback(() => { }, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<CommodityBrand>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Commodity Brand" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
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

export default CommodityBrandEntry;