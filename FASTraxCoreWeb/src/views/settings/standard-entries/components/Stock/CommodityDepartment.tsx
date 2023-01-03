import React from 'react';
import { FsxGrid, Loader } from '@app/components/common';
import { GridColumn } from '@progress/kendo-react-grid';
import { useCommodityDepartments, KEY } from '@app/services/stock/standardentries/commodityDepartment.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import StandardEntryForm from '../StandardEntryForm';
import { FormikProps } from 'formik';
import uri from '@app/helpers/endpoints';
import { useStandardEntry } from '../../useStandardEntry';
import { CommodityDepartment, newCommodityDepartment } from '@app/entities/stock/standard-entries/CommodityDepartment';
import { Checkbox } from '@progress/kendo-react-inputs';

export interface ICommodityDepartmentEntryProps { }

const CommodityDepartmentEntry: React.FC<ICommodityDepartmentEntryProps> = () => {
    const { data, isLoading } = useCommodityDepartments();
    const formikRef = React.useRef<FormikProps<any>>(null);
    const fsxGridRef = React.useRef<any>(null);
    const URI = uri.stock.SE.commodityDepartment.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newCommodityDepartment());
    }, []);

    const handleEdit = React.useCallback(() => { }, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<CommodityDepartment>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    const cellItemCheckboxTemplate = (props: any) => {
        return (
            <td>
                <Checkbox value={props.dataItem.isChargeable} disabled={true} />
            </td>
        );
    };

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Commodity Department" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
            {isLoading && <Loader />}
            {!isLoading && data && data.data && (
                <FsxGrid gridRef={fsxGridRef} data={data.data as any} className="h-full" skip={0}>
                    <GridColumn field="code" title="Code" filter={'text'} columnMenu={KGridMenuFilter} />
                    <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
                    <GridColumn field="description" title="Description" filter={'text'} columnMenu={KGridMenuFilter} />
                    <GridColumn field="isChargeable" title="Chargeable" filter={'text'} columnMenu={KGridMenuFilter} cell={cellItemCheckboxTemplate} />
                </FsxGrid>
            )}
        </>
    );
};

export default CommodityDepartmentEntry;