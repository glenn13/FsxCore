import React from 'react';
import { FsxGrid, Loader } from '@app/components/common';
import { GridColumn } from '@progress/kendo-react-grid';
import { useCommodityItemNameGroups, KEY } from '@app/services/stock/standardentries/commodityItemNameGroup.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import StandardEntryForm from '../StandardEntryForm';
import { FormikProps } from 'formik';
import uri from '@app/helpers/endpoints';
import { useStandardEntry } from '../../useStandardEntry';
import { CommodityItemNameGroup, newCommodityItemNameGroup } from '@app/entities/stock/standard-entries/CommodityItemNameGroup';
import CommodityItemNameDropdown from '@app/views/stock/common/Dropdowns/CommodityItemName';
import CommodityGroupDropdown from '@app/views/stock/common/Dropdowns/CommodityGroup';
import { Checkbox } from '@progress/kendo-react-inputs';
import { FsxFormikCheckbox } from '@app/components/common/FsxFormik';

export interface ICommodityItemNameGroupEntryProps { }

const CommodityItemNameGroupEntry: React.FC<ICommodityItemNameGroupEntryProps> = () => {
    const { data, isLoading } = useCommodityItemNameGroups();
    const formikRef = React.useRef<FormikProps<any>>(null);
    const fsxGridRef = React.useRef<any>(null);
    const URI = uri.stock.SE.commodityItemNameGroup.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newCommodityItemNameGroup());
    }, []);

    const handleEdit = React.useCallback(() => { }, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<CommodityItemNameGroup>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    const cellItemCheckboxTemplate = (props: any) => {
        return (
            <td>
                <Checkbox value={props.dataItem.isActive} disabled={true} />
            </td> 
        );
        
    };

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Commodity Item Name Group" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue}>
                <CommodityGroupDropdown isFormik={true} />
                <CommodityItemNameDropdown isFormik={true} />
                <FsxFormikCheckbox name="isActive" label="Active" className="mt-3" />
            </StandardEntryForm>
            {isLoading && <Loader />}
            {!isLoading && data && data.data && (
                <FsxGrid gridRef={fsxGridRef} data={data.data as any} className="h-full" skip={0}>
                    <GridColumn
                        field="commodityItemName.title"
                        title="Item Name"
                        filter={'text'}
                        columnMenu={KGridMenuFilter}
                    />
                    <GridColumn
                        field="commodityGroup.title"
                        title="Group"
                        filter={'text'}
                        columnMenu={KGridMenuFilter}
                    />
                    <GridColumn title="Active" cell={cellItemCheckboxTemplate} />
                </FsxGrid>
            )}
        </>
    );
};

export default CommodityItemNameGroupEntry;