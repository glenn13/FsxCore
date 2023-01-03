import React from 'react';
import { FsxGrid, Loader } from '@app/components/common';
import { GridColumn } from '@progress/kendo-react-grid';
import { useCommodityModels, KEY } from '@app/services/stock/standardentries/commodityModel.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import StandardEntryForm from '../StandardEntryForm';
import { FormikProps } from 'formik';
import uri from '@app/helpers/endpoints';
import { useStandardEntry } from '../../useStandardEntry';
import { CommodityModel, newCommodityModel } from '@app/entities/stock/standard-entries/CommodityModel';
import CommodityBrandDropdown from '@app/views/stock/common/Dropdowns/CommodityBrand';

export interface ICommodityModelEntryProps { }

const CommodityModelEntry: React.FC<ICommodityModelEntryProps> = () => {
    const { data, isLoading } = useCommodityModels();
    const formikRef = React.useRef<FormikProps<any>>(null);
    const fsxGridRef = React.useRef<any>(null);
    const URI = uri.stock.SE.commodityModel.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newCommodityModel());
    }, []);

    const handleEdit = React.useCallback(() => { }, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<CommodityModel>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Commodity Model" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue}>
                <CommodityBrandDropdown isFormik={true} />
            </StandardEntryForm>
            {isLoading && <Loader />}
            {!isLoading && data && data.data && (
                <FsxGrid gridRef={fsxGridRef} data={data.data as any} className="h-full" skip={0}>
                    <GridColumn
                        field="commodityBrand.title"
                        title="Brand"
                        filter={'text'}
                        columnMenu={KGridMenuFilter}
                    />
                    <GridColumn field="nonSparePartModel" title="Non-Spare Part Model" filter={'text'} columnMenu={KGridMenuFilter} />
                </FsxGrid>
            )}
        </>
    );
};

export default CommodityModelEntry;